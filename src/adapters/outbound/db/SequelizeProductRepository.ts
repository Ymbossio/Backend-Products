import { ProductRepository } from "../../../ports/ProductRepository";
import { Products } from "../../../domains/entities/Products";
import { ProductModel } from "../models/ProductModel";
import { StockModel } from "../models/StockModel";

export class SequelizeProductRepository implements ProductRepository {
 
  async findAll(): Promise<Products[]> {
  const products = await ProductModel.findAll({
    include: [{ model: StockModel }]
  });

  return products.map((p) => new Products(
    p.id,
    p.name,
    p.price,
    p.description,
    p.category,
    p.image,
    p.stock?.available ?? 0 // ✅ solo los campos definidos
  ));
}

}
