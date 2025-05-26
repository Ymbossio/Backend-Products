import { Router } from "express";
import { StockController } from "../adapters/inbound/http/StockController";
import { UpdateStock } from "../domains/useCases/UpdateStock";


export function createStockRouter(updateStockUseCase: UpdateStock) {
  const router = Router();
  const stockController = new StockController(updateStockUseCase);

  router.put("/UpdateStockProduct", (req, res) => stockController.updateStock(req, res));

  return router;
}
