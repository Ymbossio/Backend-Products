import { UpdateTransaction } from "../../src/domains/useCases/UpdateTransaction";
import { Transaction } from "../../src/domains/entities/Transaction";
import { TransactionRepository } from "../../src/ports/TransactionRepository";

describe("UpdateTransaction UseCase", () => {
  it("debería actualizar el estado de una transacción existente", async () => {
    const existingTransaction = new Transaction(
      "gateway-123",
      "credit_card",
      "visa",
      "Juan Pérez",
      "pending"
    );

    const repoMock: Partial<TransactionRepository> = {
      findByTransactionId: jest.fn().mockResolvedValue(existingTransaction),
      save: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new UpdateTransaction(repoMock as TransactionRepository);

    await useCase.execute("gateway-123", "approved");

    // El estado debería haberse actualizado en la entidad
    expect(existingTransaction.status).toBe("approved");

    expect(repoMock.findByTransactionId).toHaveBeenCalledTimes(1);
    expect(repoMock.findByTransactionId).toHaveBeenCalledWith("gateway-123");

    expect(repoMock.save).toHaveBeenCalledTimes(1);
    expect(repoMock.save).toHaveBeenCalledWith(existingTransaction);
  });

  it("debería lanzar un error si no se encuentra la transacción", async () => {
    const repoMock: Partial<TransactionRepository> = {
      findByTransactionId: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
    };

    const useCase = new UpdateTransaction(repoMock as TransactionRepository);

    await expect(useCase.execute("non-existent-id", "approved")).rejects.toThrow("Tranference not found");

    expect(repoMock.findByTransactionId).toHaveBeenCalledWith("non-existent-id");
    expect(repoMock.save).not.toHaveBeenCalled();
  });

  it("debería propagar errores del repositorio", async () => {
    const existingTransaction = new Transaction(
      "gateway-123",
      "credit_card",
      "visa",
      "Juan Pérez",
      "pending"
    );

    const repoMock: Partial<TransactionRepository> = {
      findByTransactionId: jest.fn().mockResolvedValue(existingTransaction),
      save: jest.fn().mockRejectedValue(new Error("DB failure")),
    };

    const useCase = new UpdateTransaction(repoMock as TransactionRepository);

    await expect(useCase.execute("gateway-123", "approved")).rejects.toThrow("DB failure");

    expect(repoMock.findByTransactionId).toHaveBeenCalledWith("gateway-123");
    expect(repoMock.save).toHaveBeenCalledWith(existingTransaction);
  });
});
