import { ProductRepository } from "../../ports/ProductRepository";
import { Products } from "../entities/Products";

export class GetAllProducts {
  constructor(private productRepo: ProductRepository) {}

  async all(): Promise<Products[]> {
    return this.productRepo.findAll();
  }
}
