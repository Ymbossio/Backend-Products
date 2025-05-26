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

  async findByTransactionId(id_transaction_gateway: string): Promise<Transaction | null> {
    const transaction = await TransactionModel.findOne({
      where: { id_transaction_gateway: id_transaction_gateway },
    });

    if (!transaction) return null;

    return new Transaction(
      transaction.id_transaction_gateway,
      transaction.payment_method,
      transaction.type_card,
      transaction.card_holder,
      transaction.status
    );
  }

  async save(transaction: Transaction): Promise<void> {
    await TransactionModel.update(
      {
        status: transaction.status,
      },
      {
        where: { id_transaction_gateway: transaction.id_transaction_gateway },
      }
    );
  }
}
