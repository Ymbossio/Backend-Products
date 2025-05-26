import { Transaction } from "../../src/domains/entities/Transaction";

describe("Transaction entity", () => {
  it("should create a Transaction with the correct properties", () => {
    const transaction = new Transaction(
      "tx123",
      "credit_card",
      "visa",
      "John Doe",
      "completed"
    );

    expect(transaction.id_transaction_gateway).toBe("tx123");
    expect(transaction.payment_method).toBe("credit_card");
    expect(transaction.type_card).toBe("visa");
    expect(transaction.card_holder).toBe("John Doe");
    expect(transaction.status).toBe("completed");
  });
});
