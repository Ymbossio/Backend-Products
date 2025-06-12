import { Request, Response } from "express";
import { TokenizeCard } from "../../../domains/useCases/TokenizeCard";

export function createPaymentController(tokenizeCardUseCase: TokenizeCard) {
  return {
    async tokenize(req: Request, res: Response) {
      try {
        const { number, exp_month, exp_year, cvc, card_holder } = req.body;

        const result = await tokenizeCardUseCase.execute({
          number,
          exp_month,
          exp_year,
          cvc,
          card_holder
        });
        res.status(200).json(result);
      } catch (error: any) {
        res.status(500).json({ error: error.message || "Error interno" });
      }
    },
  };
}
