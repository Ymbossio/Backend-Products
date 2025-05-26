import { CreateTransaction } from "../../src/domains/useCases/CreateTransaction";
import { Transaction } from "../../src/domains/entities/Transaction";
import { TransactionRepository } from "../../src/ports/TransactionRepository";

describe("CreateTransaction UseCase", () => {
  it("debería llamar a repo.create con la transacción proporcionada", async () => {
    const transactionMock = new Transaction(
      "gateway-001",
      "credit_card",
      "visa",
      "Juan Pérez",
      "approved"
    );

    const repoMock: Partial<TransactionRepository> = {
      create: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateTransaction(repoMock as TransactionRepository);

    await useCase.execute(transactionMock);

    expect(repoMock.create).toHaveBeenCalledTimes(1);
    expect(repoMock.create).toHaveBeenCalledWith(transactionMock);
  });

  it("debería lanzar un error si el repositorio falla", async () => {
    const transactionMock = new Transaction(
      "gateway-002",
      "debit_card",
      "mastercard",
      "Ana López",
      "declined"
    );

    const repoMock: Partial<TransactionRepository> = {
      create: jest.fn().mockRejectedValue(new Error("DB error")),
    };

    const useCase = new CreateTransaction(repoMock as TransactionRepository);

    await expect(useCase.execute(transactionMock)).rejects.toThrow("DB error");
  });
});
