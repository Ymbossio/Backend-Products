import { CreateDelivery } from "../../src/domains/useCases/CreateDeliveries";
import { Delivery } from "../../src/domains/entities/Deliveries";
import { DeliveryRepository } from "../../src/ports/DeliveriesRepository";

describe("CreateDelivery UseCase", () => {
  it("debería llamar a repo.create con la entrega proporcionada", async () => {
    const deliveryMock = new Delivery("Juan", "Av. Siempre Viva 123", "123-456-789");

    const repoMock: DeliveryRepository = {
      create: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateDelivery(repoMock);

    await useCase.execute(deliveryMock);

    expect(repoMock.create).toHaveBeenCalledTimes(1);
    expect(repoMock.create).toHaveBeenCalledWith(deliveryMock);
  });

  it("debería lanzar un error si el repositorio falla", async () => {
    const deliveryMock = new Delivery("Ana", "Calle Falsa 456", "123-456-789");

    const repoMock: DeliveryRepository = {
      create: jest.fn().mockRejectedValue(new Error("DB error")),
    };

    const useCase = new CreateDelivery(repoMock);

    await expect(useCase.execute(deliveryMock)).rejects.toThrow("DB error");
  });
});
