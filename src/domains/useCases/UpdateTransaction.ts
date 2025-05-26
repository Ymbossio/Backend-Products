import { TransactionRepository } from "../../ports/TransactionRepository";

export class UpdateTransaction {
  constructor(private readonly tranferRepo: TransactionRepository) {}

  async execute(id_transaction_gateway: string, status: string): Promise<void> {
    const transaction = await this.tranferRepo.findByTransactionId(id_transaction_gateway);
    if (!transaction) throw new Error("Tranference not found");

    transaction.updateTransaction(status);
    await this.tranferRepo.save(transaction);
  }
}
