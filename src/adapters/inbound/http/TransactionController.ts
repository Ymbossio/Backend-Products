import { Request, Response } from "express";
import { CreateTransaction } from "../../../domains/useCases/CreateTransaction";
import { UpdateTransaction } from "../../../domains/useCases/UpdateTransaction";

export class TransactionController {
  constructor(
    private createTransactionUseCase: CreateTransaction,
    private updateTransactionUseCase: UpdateTransaction
  ) {}

  async createTransaction(req: Request, res: Response) {
    try {
      const { card_number, status_transaction } = req.body;

      const transaction = await this.createTransactionUseCase.execute(
        card_number,
        status_transaction
      );

      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Error creating transaction" });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
      const id = Number(req.params.id); 
      const { card_number, status_transaction } = req.body;

      const updated = await this.updateTransactionUseCase.execute(id,
        card_number,
        status_transaction
      );

      if (!updated) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "Error updating transaction" });
    }
  }
}
