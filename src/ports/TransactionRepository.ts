import { Transaction } from "../domains/entities/Transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  update(id: number, data: Partial<Transaction>): Promise<Transaction | null>;

}
