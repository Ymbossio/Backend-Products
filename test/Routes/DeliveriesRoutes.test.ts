import request from "supertest";
import express from "express";
import { createDeliveryRouter } from "../../src/routes/DeliveriesRoutes";
import { CreateDelivery } from "../../src/domains/useCases/CreateDeliveries";

describe("POST /deliveries/CreateDeliveries", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  it("debería crear una entrega correctamente (201)", async () => {
    const mockUseCase = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as CreateDelivery;

    app.use("/deliveries", createDeliveryRouter(mockUseCase));

    const response = await request(app).post("/deliveries/CreateDeliveries").send({
      names: "John Doe",
      address: "123 Fake Street",
      id_transaction: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Delivery created successfully" });
  });

  it("debería retornar 400 si faltan campos obligatorios", async () => {
    const mockUseCase = {
      execute: jest.fn(),
    } as unknown as CreateDelivery;

    app.use("/deliveries", createDeliveryRouter(mockUseCase));

    const response = await request(app).post("/deliveries/CreateDeliveries").send({
      names: "John",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Missing required fields" });
  });

  it("debería retornar 500 si ocurre un error inesperado", async () => {
    const mockUseCase = {
      execute: jest.fn().mockRejectedValue(new Error("DB error")),
    } as unknown as CreateDelivery;

    app.use("/deliveries", createDeliveryRouter(mockUseCase));

    const response = await request(app).post("/deliveries/CreateDeliveries").send({
      names: "John Doe",
      address: "123 Fake Street",
      id_transaction: 1,
    });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: "Error creating delivery",
      error: "DB error",
    });
  });
});
