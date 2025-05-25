import { Request, Response } from "express";
import { GetAllProducts } from "../../../domains/useCases/GetProducts";

export class ProductController {
  constructor(
    private getProducts: GetAllProducts
  ) {}

  async GetAllProducts(req: Request, res: Response) {
    try {
      const products = await this.getProducts.all();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  }
}
