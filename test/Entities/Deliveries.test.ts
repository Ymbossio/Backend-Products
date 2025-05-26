import { Delivery } from "../../src/domains/entities/Deliveries";

describe("Delivery entity", () => {
  it("should create a Delivery with the given properties", () => {
    const delivery = new Delivery("John Doe", "123 Main St", "tx123");

    expect(delivery.names).toBe("John Doe");
    expect(delivery.address).toBe("123 Main St");
    expect(delivery.id_transaction).toBe("tx123");
  });

  it("should have readonly properties", () => {
    const delivery = new Delivery("John Doe", "123 Main St", "tx123");

    expect(Object.isFrozen(delivery)).toBe(false); 
   
  });
});
