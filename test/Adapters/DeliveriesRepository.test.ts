import { SequelizeDeliveryRepository } from '../../src/adapters/outbound/db/SequelizeDeliveriesRepository';
import { Delivery } from '../../src/domains/entities/Deliveries';
import { DeliveryModel } from '../../src/adapters/outbound/models/DeliveriesModel';


jest.mock('../../src/adapters/outbound/models/DeliveriesModel', () => ({
  DeliveryModel: {
    create: jest.fn(),
  },
}));

describe('SequelizeDeliveryRepository', () => {
  const repository = new SequelizeDeliveryRepository();

  const fakeDelivery: Delivery = {
    names: 'Juan Pérez',
    address: 'Av. Siempre Viva 123',
    id_transaction: 'tx-001',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call DeliveryModel.create with correct data', async () => {
    await repository.create(fakeDelivery);

    expect(DeliveryModel.create).toHaveBeenCalledWith({
      names: 'Juan Pérez',
      address: 'Av. Siempre Viva 123',
      id_transaction: 'tx-001',
    });

    expect(DeliveryModel.create).toHaveBeenCalledTimes(1);
  });
});
