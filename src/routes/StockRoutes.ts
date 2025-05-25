import { Router } from "express";
import { StockController } from "../adapters/inbound/http/StockController";
import { SequelizeStockRepository } from "../adapters/outbound/db/SequelizeStockRepository";
import { UpdateStock } from "../domains/useCases/UpdateStock";

const router = Router();

const stockRepository = new SequelizeStockRepository();
const updateStockUseCase = new UpdateStock(stockRepository);
const stockController = new StockController(updateStockUseCase);


router.put("/UpdateStockProduct", (req, res) => stockController.updateStock(req, res));

export default router;
