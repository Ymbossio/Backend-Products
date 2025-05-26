import { Router } from "express";
import { TransactionController } from "../adapters/inbound/http/TransactionController";
import { CreateTransaction } from "../domains/useCases/CreateTransaction";



export function createTransactionRouter(createTransaction: CreateTransaction) {
const router = Router();

const transactionsController = new TransactionController(createTransaction);


router.post("/CreateTransaction", (req, res) => transactionsController.create(req, res));

return router


}