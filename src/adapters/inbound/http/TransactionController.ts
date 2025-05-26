import { Request, Response } from "express";
import { CreateTransaction } from "../../../domains/useCases/CreateTransaction";
import { UpdateTransaction } from "../../../domains/useCases/UpdateTransaction";
import { Transaction } from "../../../domains/entities/Transaction";


export class TransactionController {
  constructor(
    private readonly createTransaction: CreateTransaction,
    private readonly updateTransaction: UpdateTransaction
  ) {}
  

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { id_transaction_gateway, payment_method, type_card, card_holder, status } = req.body;

      const transaction = new Transaction(
        id_transaction_gateway,
        payment_method,
        type_card,
        card_holder,
        status
      );

      await this.createTransaction.execute(transaction);
      res.status(201).json({ message: "Transaction created successfully" });
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      res.status(500).json({ message: "Error creating transaction", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_transaction_gateway, status } = req.body;

      if(typeof id_transaction_gateway !== "string" || typeof status !== "string") {
        res.status(400).json({ message: "Invalid input types" });
        return;
      }

      await this.updateTransaction.execute(id_transaction_gateway, status);

      res.status(201).json({ message: "Transaction updated successfully" });
    } catch (error: any) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ message: "Error updating transaction", error: error.message });
    }
  } 
}
