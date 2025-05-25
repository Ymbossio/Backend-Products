import { Router } from "express";
import { ProductController } from "../adapters/inbound/http/ProductsController";
import { SequelizeProductRepository } from "../adapters/outbound/db/SequelizeProductRepository";
import { CreateProduct } from "../domains/useCases/CreateProducts";
import { GetAllProducts } from "../domains/useCases/GetProducts";


const productRepository = new SequelizeProductRepository();
const createProduct = new CreateProduct(productRepository);
const getProduct = new GetAllProducts(productRepository);
const productController = new ProductController(createProduct, getProduct);

const router = Router()

router.get("/GetAllProducts", (req, res) => productController.GetAllProducts(req, res));
router.post("/CreateProducts", (req, res) => productController.CreateProducts(req, res));

export default router;