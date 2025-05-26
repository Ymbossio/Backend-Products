// test/Routes/TransactionRoutes.test.ts

import request from "supertest";
import express from "express";
import {createTransactionRouter} from '../../src/routes/Transaction'
import { CreateTransaction } from "../../src/domains/useCases/CreateTransaction";
import { Transaction } from "../../src/domains/entities/Transaction";

describe("POST /transactions/CreateTransaction", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  it("debería crear una transacción correctamente y retornar 201", async () => {
    const mockUseCase = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as CreateTransaction;

    app.use("/transactions", createTransactionRouter(mockUseCase));

    const response = await request(app)
      .post("/transactions/CreateTransaction")
      .send({
        id_transaction_gateway: "gw-123",
        payment_method: "credit_card",
        type_card: "VISA",
        card_holder: "Juan Pérez",
        status: "approved",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Transaction created successfully" });
    expect(mockUseCase.execute).toHaveBeenCalledWith(expect.any(Transaction));
  });

  it("debería retornar 500 si ocurre un error interno", async () => {
    const mockUseCase = {
      execute: jest.fn().mockRejectedValue(new Error("DB failure")),
    } as unknown as CreateTransaction;

    app.use("/transactions", createTransactionRouter(mockUseCase));

    const response = await request(app)
      .post("/transactions/CreateTransaction")
      .send({
        id_transaction_gateway: "gw-123",
        payment_method: "credit_card",
        type_card: "VISA",
        card_holder: "Juan Pérez",
        status: "approved",
      });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: "Error creating transaction",
      error: "DB failure",
    });
  });
});
