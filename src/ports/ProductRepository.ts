import { Products } from "../domains/entities/Products";

export interface ProductRepository {
  create(product: Products): Promise<Products>;
  findById(id: number): Promise<Products | null>;
  findAll(): Promise<Products[]>;
}
