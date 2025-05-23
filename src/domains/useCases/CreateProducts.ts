import { ProductRepository } from "../../ports/ProductRepository";
import { Products } from "../entities/Products";

export class CreateProduct {
  constructor(private productRepo: ProductRepository) {}

  async execute(name: string, price: number): Promise<Products> {
    const product = new Products(null, name, price);
    return this.productRepo.create(product);
  }
}
