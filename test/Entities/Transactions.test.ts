import { Transaction } from "../../src/domains/entities/Transaction";

describe("Transaction entity", () => {
  it("should create a Transaction instance with given properties", () => {
    const transaction = new Transaction(
      "tx123",
      "credit_card",
      "VISA",
      "John Doe",
      "completed"
    );

    expect(transaction.id_transaction_gateway).toBe("tx123");
    expect(transaction.payment_method).toBe("credit_card");
    expect(transaction.type_card).toBe("VISA");
    expect(transaction.card_holder).toBe("John Doe");
    expect(transaction.status).toBe("completed");
  });
});
