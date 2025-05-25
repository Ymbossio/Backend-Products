import { DeliveryRepository } from "../../../ports//DeliveriesRepository";
import { Delivery } from "../../../domains/entities/Deliveries";
import { DeliveryModel } from "../models/DeliveriesModel";



export class SequelizeDeliveryRepository implements DeliveryRepository {
  async create(delivery: Delivery): Promise<void> {
    await DeliveryModel.create({
      names: delivery.names,
      address: delivery.address,
      id_transaction: delivery.id_transaction,
    });
  }
}
