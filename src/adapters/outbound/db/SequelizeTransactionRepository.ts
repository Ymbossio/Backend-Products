import { Transaction } from "../../../domains/entities/Transaction"
import { TransactionRepository } from "../../../ports/TransactionRepository";
import { TransactionModel } from "../models/TransactionModel";

export class SequelizeTransactionRepository implements TransactionRepository {
  async create(transaction: Transaction): Promise<void> {
    await TransactionModel.create({
      id_transaction_gateway: transaction.id_transaction_gateway,
      payment_method: transaction.payment_method,
      type_card: transaction.type_card,
      card_holder: transaction.card_holder,
      status: transaction.status,
    });
  }
}
