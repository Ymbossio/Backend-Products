import { ProductRepository } from "../../ports/ProductRepository";
import { Products } from "../entities/Products";

export class GetAllProducts {
  constructor(private productRepo: ProductRepository) {}

  async byId(id: number): Promise<Products | null> {
    return this.productRepo.findById(id);
  }

  async all(): Promise<Products[]> {
    return this.productRepo.findAll();
  }
}
