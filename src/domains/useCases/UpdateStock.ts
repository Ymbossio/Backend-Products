import { StockRepository } from "../../ports/StockRepository";
import { Stock } from "../entities/Stock";

export class UpdateStock {
  constructor(private readonly stockRepo: StockRepository) {}

  async execute(productId: number, available: number): Promise<void> {
    const stock = await this.stockRepo.findByProductId(productId);
    if (!stock) throw new Error("Stock not found");

    stock.updateAvailable(available);
    await this.stockRepo.save(stock);
  }
}
