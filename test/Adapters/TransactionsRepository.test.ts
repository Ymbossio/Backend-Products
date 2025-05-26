import { SequelizeTransactionRepository } from "../../src/adapters/outbound/db/SequelizeTransactionRepository";
import { TransactionModel } from "../../src/adapters/outbound/models/TransactionModel";
import { Transaction } from "../../src/domains/entities/Transaction";

jest.mock("../../src/adapters/outbound/models/TransactionModel");

describe("SequelizeTransactionRepository", () => {
  let repo: SequelizeTransactionRepository;

  beforeEach(() => {
    repo = new SequelizeTransactionRepository();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("debería llamar a TransactionModel.create con los datos correctos", async () => {
      const transaction = new Transaction("gw-123", "credit_card", "VISA", "Juan Perez", "APPROVED");
      (TransactionModel.create as jest.Mock).mockResolvedValue(undefined);

      await repo.create(transaction);

      expect(TransactionModel.create).toHaveBeenCalledWith({
        id_transaction_gateway: "gw-123",
        payment_method: "credit_card",
        type_card: "VISA",
        card_holder: "Juan Perez",
        status: "APPROVED",
      });
    });
  });

  describe("findByTransactionId", () => {
    it("debería retornar una instancia de Transaction si la encuentra", async () => {
      const mockRecord = {
        id_transaction_gateway: "gw-123",
        payment_method: "credit_card",
        type_card: "VISA",
        card_holder: "Juan Perez",
        status: "APPROVED",
      };
      (TransactionModel.findOne as jest.Mock).mockResolvedValue(mockRecord);

      const result = await repo.findByTransactionId("gw-123");

      expect(TransactionModel.findOne).toHaveBeenCalledWith({ where: { id_transaction_gateway: "gw-123" } });
      expect(result).toEqual(new Transaction(
        "gw-123",
        "credit_card",
        "VISA",
        "Juan Perez",
        "APPROVED"
      ));
    });

    it("debería retornar null si no encuentra la transacción", async () => {
      (TransactionModel.findOne as jest.Mock).mockResolvedValue(null);

      const result = await repo.findByTransactionId("non-existent-id");

      expect(TransactionModel.findOne).toHaveBeenCalledWith({ where: { id_transaction_gateway: "non-existent-id" } });
      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("debería llamar a TransactionModel.update con los datos correctos", async () => {
      const transaction = new Transaction("gw-123", "credit_card", "VISA", "Juan Perez", "APPROVED");
      (TransactionModel.update as jest.Mock).mockResolvedValue([1]); // Sequelize update returns an array with number of affected rows

      await repo.save(transaction);

      expect(TransactionModel.update).toHaveBeenCalledWith(
        { status: "APPROVED" },
        { where: { id_transaction_gateway: "gw-123" } }
      );
    });
  });
});
