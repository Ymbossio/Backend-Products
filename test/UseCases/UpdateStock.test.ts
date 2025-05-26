import { UpdateStock } from "../../src/domains/useCases/UpdateStock";
import { StockRepository } from "../../src/ports/StockRepository";
import { Stock } from "../../src/domains/entities/Stock";

describe("UpdateStock UseCase", () => {
  let repoMock: jest.Mocked<StockRepository>;
  let useCase: UpdateStock;

  beforeEach(() => {
    repoMock = {
      findByProductId: jest.fn(),
      save: jest.fn(),
      update: jest.fn(), // aunque no se usa en el UseCase, lo declaramos para cumplir la interface
    };
    useCase = new UpdateStock(repoMock);
  });

  it("debería actualizar correctamente el stock restando 1 unidad", async () => {
    const stock = new Stock(1, 2, 10); // stock.available = 10

    // Mock del método updateAvailable en la instancia
    stock.updateAvailable = jest.fn(function (newAvailable: number) {
      this.available = newAvailable;
    });

    repoMock.findByProductId.mockResolvedValue(stock);
    repoMock.save.mockResolvedValue();

    await useCase.execute(1, 10);

    expect(repoMock.findByProductId).toHaveBeenCalledWith(1);
    expect(stock.updateAvailable).toHaveBeenCalledWith(9); // 10 - 1
    expect(repoMock.save).toHaveBeenCalledWith(stock);
  });

  it("debería lanzar error si el stock no existe", async () => {
    repoMock.findByProductId.mockResolvedValue(null);

    await expect(useCase.execute(1, 10)).rejects.toThrow("Stock not found");

    expect(repoMock.findByProductId).toHaveBeenCalledWith(1);
    expect(repoMock.save).not.toHaveBeenCalled();
  });
});
