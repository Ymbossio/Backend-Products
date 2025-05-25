import { Products } from "../domains/entities/Products";

export interface ProductRepository {
  findAll(): Promise<Products[]>;
}
