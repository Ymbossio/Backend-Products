import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../../ports/TransactionRepository";

export class CreateTransaction {
  constructor(private readonly repo: TransactionRepository) {}

  async execute(transaction: Transaction): Promise<void> {
    await this.repo.create(transaction);
  }
}
