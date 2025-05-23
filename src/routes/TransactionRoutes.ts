import { Router } from "express";
import { TransactionController } from "../adapters/inbound/http/TransactionController";
import { SequelizeTransactionRepository } from "../adapters/outbound/db/SequelizeTransactionRepository";
import { CreateTransaction } from "../domains/useCases/CreateTransaction";
import { UpdateTransaction } from "../domains/useCases/UpdateTransaction";


const transactionRepository = new SequelizeTransactionRepository();
const createTransaccion = new CreateTransaction(transactionRepository);
const updateTransaccion = new UpdateTransaction(transactionRepository);
const transactionController = new TransactionController(createTransaccion, updateTransaccion);

const routerTransaccion = Router()

routerTransaccion.get("/CreateTransaction", (req, res) => transactionController.createTransaction(req, res));
routerTransaccion.put("/transactions/:id", (req, res) => transactionController.updateTransaction(req, res));


export default routerTransaccion;