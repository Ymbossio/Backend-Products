import { Router } from "express";
import { TokenizeCard } from "../domains/useCases/TokenizeCard";
import { createPaymentController } from "../adapters/inbound/http/gangsWayController";

export function gangsWayRouter(tokenizeCardUseCase: TokenizeCard) {
  const router = Router();

  const controller = createPaymentController(tokenizeCardUseCase);

  router.post("/tokenize-card", controller.tokenize);

  return router;
}
