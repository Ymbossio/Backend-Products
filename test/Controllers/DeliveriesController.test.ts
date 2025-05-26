import { DeliveryController } from '../../src/adapters/inbound/http/DeliveriesController';
import { Request, Response } from 'express';
import { Delivery } from '../../src/domains/entities/Deliveries';

describe('DeliveryController unit tests', () => {

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it('POST /CreateDeliveries - crea una entrega exitosamente', async () => {
    const createDeliveryMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };

    const controller = new DeliveryController(createDeliveryMock as any);

    const req = {
      body: {
        names: 'Juan Perez',
        address: 'Calle Falsa 123',
        id_transaction: 'abc123',
      },
    } as Request;

    const res = mockResponse();

    await controller.create(req, res);

    expect(createDeliveryMock.execute).toHaveBeenCalledTimes(1);
    // Verificar que ejecutó con un Delivery correcto
    const calledArg = createDeliveryMock.execute.mock.calls[0][0];
    expect(calledArg).toBeInstanceOf(Delivery);
    expect(calledArg.names).toBe('Juan Perez');
    expect(calledArg.address).toBe('Calle Falsa 123');
    expect(calledArg.id_transaction).toBe('abc123');

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Delivery created successfully" });
  });

  it('POST /CreateDeliveries - retorna 400 si faltan campos', async () => {
    const createDeliveryMock = {
      execute: jest.fn(),
    };

    const controller = new DeliveryController(createDeliveryMock as any);

    const req = {
      body: {
        names: 'Juan Perez',
        // falta address e id_transaction
      },
    } as Request;

    const res = mockResponse();

    await controller.create(req, res);

    expect(createDeliveryMock.execute).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Missing required fields" });
  });

  it('POST /CreateDeliveries - maneja error interno devolviendo 500', async () => {
    const createDeliveryMock = {
      execute: jest.fn().mockRejectedValue(new Error('DB error')),
    };

    const controller = new DeliveryController(createDeliveryMock as any);

    const req = {
      body: {
        names: 'Juan Perez',
        address: 'Calle Falsa 123',
        id_transaction: 'abc123',
      },
    } as Request;

    const res = mockResponse();

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    await controller.create(req, res);

    expect(createDeliveryMock.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error creating delivery",
      error: "DB error"
    });
    
    consoleErrorMock.mockRestore();
  });

});
