import { Router } from "express";
import { TransactionController } from "../adapters/inbound/http/TransactionController";
import { CreateTransaction } from "../domains/useCases/CreateTransaction";
import { UpdateTransaction } from "../domains/useCases/UpdateTransaction";

export function TransactionActions(
  createTransaction: CreateTransaction,
  updateTransaction: UpdateTransaction
) {
  const router = Router();

  const transactionsController = new TransactionController(createTransaction, updateTransaction);

  router.post("/CreateTransaction", (req, res) => transactionsController.create(req, res));
  router.put("/UpdateTransaction", (req, res) => transactionsController.update(req, res));

  return router;
}
