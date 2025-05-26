import { TransactionController } from "../../src/adapters/inbound/http/TransactionController";
import { Request, Response } from "express";
import { Transaction } from "../../src/domains/entities/Transaction";

describe("TransactionController unit tests", () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it("POST /CreateTransaction - crea una transacción correctamente", async () => {
    const createTransactionMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };

    const controller = new TransactionController(createTransactionMock as any);

    const req = {
      body: {
        id_transaction_gateway: "gtw-123",
        payment_method: "credit_card",
        type_card: "VISA",
        card_holder: "Juan Perez",
        status: "APPROVED",
      },
    } as Request;

    const res = mockResponse();

    await controller.create(req, res);

    expect(createTransactionMock.execute).toHaveBeenCalledWith(
      new Transaction(
        "gtw-123",
        "credit_card",
        "VISA",
        "Juan Perez",
        "APPROVED"
      )
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Transaction created successfully" });
  });

  it("POST /CreateTransaction - maneja errores devolviendo 500", async () => {
    const createTransactionMock = {
      execute: jest.fn().mockRejectedValue(new Error("DB error")),
    };

    const controller = new TransactionController(createTransactionMock as any);

    const req = {
      body: {
        id_transaction_gateway: "gtw-123",
        payment_method: "credit_card",
        type_card: "VISA",
        card_holder: "Juan Perez",
        status: "APPROVED",
      },
    } as Request;

    const res = mockResponse();

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});

    await controller.create(req, res);

    expect(createTransactionMock.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error creating transaction",
      error: "DB error",
    });

    consoleErrorMock.mockRestore();
  });
});
