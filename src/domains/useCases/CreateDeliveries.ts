import { Delivery } from "../entities/Deliveries";
import { DeliveryRepository } from "../../ports/DeliveriesRepository";

export class CreateDelivery {
  constructor(private readonly repo: DeliveryRepository) {}

  async execute(delivery: Delivery): Promise<void> {
    await this.repo.create(delivery);
  }
}
