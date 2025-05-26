import { SequelizeStockRepository } from '../../src/adapters/outbound/db/SequelizeStockRepository';
import { StockModel } from '../../src/adapters/outbound/models/StockModel';
import { Stock } from '../../src/domains/entities/Stock';

jest.mock('../../src/adapters/outbound/models/StockModel');

describe('SequelizeStockRepository', () => {
  let repository: SequelizeStockRepository;

  beforeEach(() => {
    repository = new SequelizeStockRepository();
    jest.clearAllMocks();
  });

  describe('update', () => {
    it('should throw "Method not implemented." error', () => {
      const stock = new Stock(1, 10, 20);
      expect(() => repository.update(stock)).toThrowError("Method not implemented.");
    });
  });

  describe('findByProductId', () => {
    it('should return a Stock entity if found', async () => {
      const mockStock = {
        id_stock: 1,
        id_product: 10,
        available: 15,
      };

      // @ts-ignore
      StockModel.findOne.mockResolvedValue(mockStock);

      const result = await repository.findByProductId(10);

      expect(StockModel.findOne).toHaveBeenCalledWith({ where: { id_product: 10 } });
      expect(result).toBeInstanceOf(Stock);
      expect(result).toEqual(new Stock(1, 10, 15));
    });

    it('should return null if stock not found', async () => {
      // @ts-ignore
      StockModel.findOne.mockResolvedValue(null);

      const result = await repository.findByProductId(999);

      expect(StockModel.findOne).toHaveBeenCalledWith({ where: { id_product: 999 } });
      expect(result).toBeNull();
    });
  });

  describe('save', () => {
    it('should update stock available quantity', async () => {
      const stock = new Stock(1, 10, 20);

      // @ts-ignore
      StockModel.update.mockResolvedValue([1]); // Sequelize update usually returns [affectedCount]

      await repository.save(stock);

      expect(StockModel.update).toHaveBeenCalledWith(
        { available: 20 },
        { where: { id_product: 10 } }
      );
    });
  });
});
