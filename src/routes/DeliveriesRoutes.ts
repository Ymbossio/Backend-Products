import { Router } from "express";
import { DeliveryController } from "../adapters/inbound/http/DeliveriesController";
import { CreateDelivery } from "../domains/useCases/CreateDeliveries";


export function createDeliveryRouter(createDeliveryUseCase: CreateDelivery) {

  const router = Router();
  const controller = new DeliveryController(createDeliveryUseCase);
  router.post("/CreateDeliveries", (req, res) => controller.create(req, res));

  return router;

}
