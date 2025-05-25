import { StockRepository } from "../../../ports/StockRepository";
import { Stock } from "../../../domains/entities/Stock";
import { StockModel } from "../models/StockModel";



export class SequelizeStockRepository implements StockRepository {
  update(stock: Stock): Promise<Stock> {
    throw new Error("Method not implemented.");
  }
  async findByProductId(productId: number): Promise<Stock | null> {
    const model = await StockModel.findOne({ where: { id_product: productId } });
    if (!model) return null;

    return new Stock(model.id_stock, model.id_product, model.available);
  }

  async save(stock: Stock): Promise<void> {
    await StockModel.update(
      { available: stock.available },
      { where: { id_product: stock.id_product } }
    );
  }
}
