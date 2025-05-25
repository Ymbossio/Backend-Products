import { StockRepository } from "../../ports/StockRepository";

export class UpdateStock {
  constructor(private readonly stockRepo: StockRepository) {}

  async execute(productId: number, available: number): Promise<void> {
    const stock = await this.stockRepo.findByProductId(productId);
    if (!stock) throw new Error("Stock not found");

    //Restar 1 unidad al stock actual
    const newStock = stock.available - 1;

    stock.updateAvailable(newStock);
    await this.stockRepo.save(stock);
  }
}
