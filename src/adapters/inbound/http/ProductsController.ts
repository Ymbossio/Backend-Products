import { Request, Response } from "express";
import { CreateProduct } from "../../../domains/useCases/CreateProducts";
import { GetAllProducts } from "../../../domains/useCases/GetProducts";

export class ProductController {
  constructor(
    private createProduct: CreateProduct,
    private getProducts: GetAllProducts
  ) {}

  async CreateProducts(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      const product = await this.createProduct.execute(name, price);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  }

  async GetProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await this.getProducts.byId(id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  }

  async GetAllProducts(req: Request, res: Response) {
    try {
      const products = await this.getProducts.all();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  }
}
