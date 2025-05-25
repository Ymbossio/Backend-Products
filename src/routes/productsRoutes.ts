import { Router } from "express";
import { ProductController } from "../adapters/inbound/http/ProductsController";
import { SequelizeProductRepository } from "../adapters/outbound/db/SequelizeProductRepository";
import { GetAllProducts } from "../domains/useCases/GetProducts";


const productRepository = new SequelizeProductRepository();
const getProduct = new GetAllProducts(productRepository);
const productController = new ProductController(getProduct);

const router = Router()

router.get("/GetAllProducts", (req, res) => productController.GetAllProducts(req, res));

export default router;