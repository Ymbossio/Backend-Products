import request from "supertest";
import express from "express";
import { TransactionActions } from '../../src/routes/Transaction';
import { CreateTransaction } from "../../src/domains/useCases/CreateTransaction";
import { UpdateTransaction } from "../../src/domains/useCases/UpdateTransaction";
import { Transaction } from "../../src/domains/entities/Transaction";

describe("Transaction Routes", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe("POST /transactions/CreateTransaction", () => {
    it("debería crear una transacción correctamente y retornar 201", async () => {
      const mockCreateUseCase = {
        execute: jest.fn().mockResolvedValue(undefined),
      } as unknown as CreateTransaction;

      const mockUpdateUseCase = {
        execute: jest.fn(),
      } as unknown as UpdateTransaction;

      app.use("/transactions", TransactionActions(mockCreateUseCase, mockUpdateUseCase));

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
      expect(mockCreateUseCase.execute).toHaveBeenCalledWith(expect.any(Transaction));
    });

    it("debería retornar 500 si ocurre un error interno", async () => {
      const mockCreateUseCase = {
        execute: jest.fn().mockRejectedValue(new Error("DB failure")),
      } as unknown as CreateTransaction;

      const mockUpdateUseCase = {
        execute: jest.fn(),
      } as unknown as UpdateTransaction;

      app.use("/transactions", TransactionActions(mockCreateUseCase, mockUpdateUseCase));

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

  describe("PUT /transactions/UpdateTransaction", () => {
    it("debería actualizar una transacción correctamente y retornar 201", async () => {
      const mockCreateUseCase = {
        execute: jest.fn(),
      } as unknown as CreateTransaction;

      const mockUpdateUseCase = {
        execute: jest.fn().mockResolvedValue(undefined),
      } as unknown as UpdateTransaction;

      app.use("/transactions", TransactionActions(mockCreateUseCase, mockUpdateUseCase));

      const response = await request(app)
        .put("/transactions/UpdateTransaction")
        .send({
          id_transaction_gateway: "gw-123",
          status: "approved",
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "Transaction updated successfully" });
      expect(mockUpdateUseCase.execute).toHaveBeenCalledWith("gw-123", "approved");
    });

    it("debería retornar 400 si el tipo de input es inválido", async () => {
      const mockCreateUseCase = {
        execute: jest.fn(),
      } as unknown as CreateTransaction;

      const mockUpdateUseCase = {
        execute: jest.fn(),
      } as unknown as UpdateTransaction;

      app.use("/transactions", TransactionActions(mockCreateUseCase, mockUpdateUseCase));

      const response = await request(app)
        .put("/transactions/UpdateTransaction")
        .send({
          id_transaction_gateway: 123, // inválido
          status: null, // inválido
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid input types" });
      expect(mockUpdateUseCase.execute).not.toHaveBeenCalled();
    });

    it("debería retornar 500 si ocurre un error interno al actualizar", async () => {
      const mockCreateUseCase = {
        execute: jest.fn(),
      } as unknown as CreateTransaction;

      const mockUpdateUseCase = {
        execute: jest.fn().mockRejectedValue(new Error("DB failure")),
      } as unknown as UpdateTransaction;

      app.use("/transactions", TransactionActions(mockCreateUseCase, mockUpdateUseCase));

      const response = await request(app)
        .put("/transactions/UpdateTransaction")
        .send({
          id_transaction_gateway: "gw-123",
          status: "approved",
        });

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        message: "Error updating transaction",
        error: "DB failure",
      });
    });
  });
});
