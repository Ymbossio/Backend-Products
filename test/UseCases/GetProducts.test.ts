import { GetAllProducts } from "../../src/domains/useCases/GetProducts";
import { ProductRepository } from "../../src/ports/ProductRepository";
import { Products } from "../../src/domains/entities/Products";

describe("GetAllProducts UseCase", () => {
  it("debería retornar todos los productos del repositorio", async () => {
    const mockProducts: Products[] = [
      new Products(1, "Producto A", 100, "Desc A", "Cat A", "img-a.jpg", 10),
      new Products(2, "Producto B", 200, "Desc B", "Cat B", "img-b.jpg", 20),
    ];

    const repoMock: ProductRepository = {
      findAll: jest.fn().mockResolvedValue(mockProducts),
    };

    const useCase = new GetAllProducts(repoMock);

    const result = await useCase.all();

    expect(repoMock.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
  });

  it("debería propagar errores del repositorio", async () => {
    const repoMock: ProductRepository = {
      findAll: jest.fn().mockRejectedValue(new Error("DB error")),
    };

    const useCase = new GetAllProducts(repoMock);

    await expect(useCase.all()).rejects.toThrow("DB error");
  });
});
