import { Delivery } from "../domains/entities/Deliveries";

export interface DeliveryRepository {
  create(delivery: Delivery): Promise<void>;
}
