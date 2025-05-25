import { ProductRepository } from "../../../ports/ProductRepository";
import { Products } from "../../../domains/entities/Products";
import { ProductModel } from "../models/ProductModel";

export class SequelizeProductRepository implements ProductRepository {
  async create(product: Products): Promise<Products> {
    const created = await ProductModel.create({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image, 
      stock: product.stock
    });
    return new Products(created.id, created.name, created.price, created.description, created.category, created.image, created.stock);
  }

  async findById(id: number): Promise<Products | null> {
    const found = await ProductModel.findByPk(id);
    if (!found) return null;
    return new Products(found.id, found.name, found.price, found.description, found.category, found.image, found.stock);
  }

  async findAll(): Promise<Products[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (p) => new Products(p.id, p.name, p.price, p.description, p.category, p.image, p.stock)
    );
  }
}
