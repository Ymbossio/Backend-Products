import { TransactionRepository } from "../../../ports/TransactionRepository";
import { Transaction } from "../../../domains/entities/Transaction";
import { TransactionModel } from "../models/TransactionModel";


  
export class SequelizeTransactionRepository implements TransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const created = await TransactionModel.create({
      card_number: transaction.card_number,
      status_transaction: transaction.status_transaction,
    });

    return new Transaction(
      created.id_transaction,
      created.card_number,
      created.status_transaction
    );
  }

  async update(id: number, data: Partial<Transaction>): Promise<Transaction | null> {
    const found = await TransactionModel.findByPk(id);
    if (!found) return null;

    if (data.card_number !== undefined) {
      found.card_number = data.card_number;
    }
    if (data.status_transaction !== undefined) {
      found.status_transaction = data.status_transaction;
    }

    await found.save();

    return new Transaction(
      found.id_transaction,
      found.card_number,
      found.status_transaction
    );
  }
}

