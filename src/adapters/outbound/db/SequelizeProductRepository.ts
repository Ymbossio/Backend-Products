import { ProductRepository } from "../../../ports/ProductRepository";
import { Products } from "../../../domains/entities/Products";
import { ProductModel } from "../models/ProductModel";

export class SequelizeProductRepository implements ProductRepository {
  async create(product: Products): Promise<Products> {
    const created = await ProductModel.create({
      name: product.name,
      price: product.price,
    });
    return new Products(created.id, created.name, created.price);
  }

  async findById(id: number): Promise<Products | null> {
    const found = await ProductModel.findByPk(id);
    if (!found) return null;
    return new Products(found.id, found.name, found.price);
  }

  async findAll(): Promise<Products[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (p) => new Products(p.id, p.name, p.price)
    );
  }
}
