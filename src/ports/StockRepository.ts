import { Stock } from "../domains/entities/Stock";

export interface StockRepository {
  update(stock: Stock): Promise<Stock>;
  findByProductId(productId: number): Promise<Stock | null>;
  save(stock: Stock): Promise<void>;
}
