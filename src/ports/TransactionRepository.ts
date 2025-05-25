import { Transaction } from "../domains/entities/Transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
}
