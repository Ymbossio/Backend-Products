import { Stock } from "../../src/domains/entities/Stock";

describe("Stock entity", () => {
  it("should create a Stock instance with given properties", () => {
    const stock = new Stock(1, 100, 10);

    expect(stock.id_stock).toBe(1);
    expect(stock.id_product).toBe(100);
    expect(stock.available).toBe(10);
  });

  it("should update available quantity with updateAvailable method", () => {
    const stock = new Stock(1, 100, 10);
    stock.updateAvailable(7);

    expect(stock.available).toBe(7);
  });
});
