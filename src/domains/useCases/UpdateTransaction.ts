import { TransactionRepository } from "../../ports/TransactionRepository";
import { Transaction } from "../entities/Transaction";

export class UpdateTransaction {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(
    id_transaction: number,
    card_number: number,
    status_transaction: number
  ): Promise<Transaction | null> {
    const updatedTransaction = await this.transactionRepository.update(id_transaction, {
      card_number,
      status_transaction,
    });

    return updatedTransaction;
  }
}
