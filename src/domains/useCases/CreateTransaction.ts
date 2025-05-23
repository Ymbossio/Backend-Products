import { TransactionRepository } from "../../ports/TransactionRepository";
import { Transaction } from "../entities/Transaction";


export class CreateTransaction {
  constructor(private transactionRepo: TransactionRepository) {}

  async execute(card_number: number, status_transaction: number): Promise<Transaction> {
    const transaction = new Transaction(null, card_number, status_transaction);
    return this.transactionRepo.create(transaction);
  }
}