import { Transaction } from "../domains/entities/Transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  findByTransactionId(id_transaction_gateway: string): Promise<Transaction | null>;
  save(transaction: Transaction): Promise<void>;
  
}
