import { TransactionController } from "../../src/adapters/inbound/http/TransactionController";
import { Request, Response } from "express";
import { Transaction } from "../../src/domains/entities/Transaction";

describe("TransactionController update method unit tests", () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it("PUT /UpdateTransaction - actualiza una transacción correctamente", async () => {
    const updateTransactionMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };
    const createTransactionMock = { execute: jest.fn() };

    const controller = new TransactionController(
      createTransactionMock as any,
      updateTransactionMock as any
    );

    const req = {
      body: {
        id_transaction_gateway: "gtw-123",
        status: "APPROVED",
      },
    } as Request;

    const res = mockResponse();

    await controller.update(req, res);

    expect(updateTransactionMock.execute).toHaveBeenCalledWith("gtw-123", "APPROVED");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Transaction updated successfully" });
  });

  it("PUT /UpdateTransaction - retorna 400 si tipos de entrada no son string", async () => {
    const updateTransactionMock = {
      execute: jest.fn(),
    };
    const createTransactionMock = { execute: jest.fn() };

    const controller = new TransactionController(
      createTransactionMock as any,
      updateTransactionMock as any
    );

    const req = {
      body: {
        id_transaction_gateway: 123,  
        status: null,               
      },
    } as unknown as Request;

    const res = mockResponse();

    await controller.update(req, res);

    expect(updateTransactionMock.execute).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid input types" });
  });

  it("PUT /UpdateTransaction - maneja errores internos devolviendo 500", async () => {
    const updateTransactionMock = {
      execute: jest.fn().mockRejectedValue(new Error("DB error")),
    };
    const createTransactionMock = { execute: jest.fn() };

    const controller = new TransactionController(
      createTransactionMock as any,
      updateTransactionMock as any
    );

    const req = {
      body: {
        id_transaction_gateway: "gtw-123",
        status: "APPROVED",
      },
    } as Request;

    const res = mockResponse();

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});

    await controller.update(req, res);

    expect(updateTransactionMock.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error updating transaction",
      error: "DB error",
    });

    consoleErrorMock.mockRestore();
  });
});
