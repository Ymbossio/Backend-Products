import { Request, Response } from "express";
import { CreateDelivery } from "../../../domains/useCases/CreateDeliveries";
import { Delivery } from "../../../domains/entities/Deliveries";



export class DeliveryController {
  constructor(private readonly createDelivery: CreateDelivery) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { names, address, id_transaction } = req.body;

      if (!names || !address || !id_transaction) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const delivery = new Delivery(names, address, id_transaction);
      await this.createDelivery.execute(delivery);

      res.status(201).json({ message: "Delivery created successfully" });
    } catch (error: any) {
      console.error("Error creating delivery:", error);
      res.status(500).json({ message: "Error creating delivery", error: error.message });
    }
  }
}
