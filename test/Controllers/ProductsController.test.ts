import { ProductController } from '../../src/adapters/inbound/http/ProductsController';
import { Request, Response } from 'express';

describe('ProductController unit tests', () => {

  const mockRequest = {} as Request;

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it('GET /GetAllProducts - devuelve todos los productos', async () => {
    const productosMock = [
      { id: '1', name: 'Producto 1', price: 100, description: 'Descripción 1', category: 'Categoría 1', image: 'Imagen 1' },
      { id: '2', name: 'Producto 2', price: 200, description: 'Descripción 2', category: 'Categoría 2', image: 'Imagen 2' },
    ];

    const getAllProductsMock = {
      all: jest.fn().mockResolvedValue(productosMock),
    };

    const controller = new ProductController(getAllProductsMock as any);

    const req = mockRequest;
    const res = mockResponse();

    await controller.GetAllProducts(req, res);

    expect(getAllProductsMock.all).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(productosMock);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('GET /GetAllProducts - maneja error lanzando status 500', async () => {
    const getAllProductsMock = {
      all: jest.fn().mockRejectedValue(new Error('Error inesperado')),
    };

    const controller = new ProductController(getAllProductsMock as any);

    const req = mockRequest;
    const res = mockResponse();

    await controller.GetAllProducts(req, res);

    expect(getAllProductsMock.all).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching products' });
  });
});
