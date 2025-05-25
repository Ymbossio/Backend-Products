import { Router } from "express";
import { TransactionController } from "../adapters/inbound/http/TransactionController";
import { SequelizeTransactionRepository } from "../adapters/outbound/db/SequelizeTransactionRepository";
import { CreateTransaction } from "../domains/useCases/CreateTransaction";

const router = Router();

const TransactionsRepository = new SequelizeTransactionRepository();
const createTranferUseCase = new CreateTransaction(TransactionsRepository);
const transactionsController = new TransactionController(createTranferUseCase);


router.post("/CreateTransaction", (req, res) => transactionsController.create(req, res));

export default router;
