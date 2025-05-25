import { Router } from "express";
import { DeliveryController } from "../adapters/inbound/http/DeliveriesController";
import { SequelizeDeliveryRepository } from "../adapters/outbound/db/SequelizeDeliveriesRepository";
import { CreateDelivery } from "../domains/useCases/CreateDeliveries";


const productRepository = new SequelizeDeliveryRepository();
const getProduct = new CreateDelivery(productRepository);
const DeliveriesController = new DeliveryController(getProduct);

const router = Router()

router.post("/CreateDeliveries", (req, res) => DeliveriesController.create(req, res));

export default router;