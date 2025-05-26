import { SequelizeProductRepository } from '../../src/adapters/outbound/db/SequelizeProductRepository';
import { ProductModel } from '../../src/adapters/outbound/models/ProductModel';
import { StockModel } from '../../src/adapters/outbound/models/StockModel';
import { Products } from '../../src/domains/entities/Products';
import { Op } from 'sequelize';

jest.mock('../../src/adapters/outbound/models/ProductModel');

describe('SequelizeProductRepository', () => {
  let repository: SequelizeProductRepository;

  beforeEach(() => {
    repository = new SequelizeProductRepository();
    jest.clearAllMocks();
  });

  it('should return products with available stock > 0', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Producto A',
        price: 100,
        description: 'Desc A',
        category: 'Cat A',
        image: 'imgA.jpg',
        stock: { available: 10 },
      },
      {
        id: 2,
        name: 'Producto B',
        price: 200,
        description: 'Desc B',
        category: 'Cat B',
        image: 'imgB.jpg',
        stock: { available: 5 },
      },
    ];

    // @ts-ignore
    ProductModel.findAll.mockResolvedValue(mockProducts);

    const result = await repository.findAll();

    expect(ProductModel.findAll).toHaveBeenCalledWith({
      include: [{
        model: StockModel,
        where: {
          available: {
            [Op.gt]: 0,
          },
        },
      }],
    });

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Products);
    expect(result[0]).toEqual(new Products(1, 'Producto A', 100, 'Desc A', 'Cat A', 'imgA.jpg', 10));
    expect(result[1]).toEqual(new Products(2, 'Producto B', 200, 'Desc B', 'Cat B', 'imgB.jpg', 5));
  });

  it('should return stock as 0 if stock is undefined', async () => {
    const mockProducts = [
      {
        id: 3,
        name: 'Producto C',
        price: 300,
        description: 'Desc C',
        category: 'Cat C',
        image: 'imgC.jpg',
        stock: undefined, // ← rama que faltaba
      },
    ];

    // @ts-ignore
    ProductModel.findAll.mockResolvedValue(mockProducts);

    const result = await repository.findAll();

    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Products);
    expect(result[0]).toEqual(
      new Products(3, 'Producto C', 300, 'Desc C', 'Cat C', 'imgC.jpg', 0)
    );
  });
});
