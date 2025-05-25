import { Request, Response } from "express";
import { UpdateStock } from "../../../domains/useCases/UpdateStock";



export class StockController {
  constructor(private updateStockUseCase: UpdateStock) {}

  async updateStock(req: Request, res: Response): Promise<void> {    

    try {
      const { id_products, available } = req.body;      

      if (typeof id_products !== "number" || typeof available !== "number") {
        res.status(400).json({ message: "Invalid input types" });
        return;
      } 
      await this.updateStockUseCase.execute(id_products, available);

      res.status(200).json({ message: "Stock updated successfully"});
    } catch (error: any) {
      console.error("Error updating stock:", error);
      res.status(500).json({ message: "Error updating stock", error: error.message });
    }
  }
}

