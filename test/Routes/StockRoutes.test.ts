import request from "supertest";
import express from "express";
import {createStockRouter} from '../../src/routes/StockRoutes'
import { UpdateStock } from "../../src/domains/useCases/UpdateStock";

describe("PUT /stock/UpdateStockProduct", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  it("debería actualizar el stock correctamente y retornar 200", async () => {
    const updateStockMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as UpdateStock;

    app.use("/stock", createStockRouter(updateStockMock));

    const response = await request(app)
      .put("/stock/UpdateStockProduct")
      .send({
        id_products: 1,
        available: 50,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Stock updated successfully" });
  });

  it("debería retornar 400 si los datos son inválidos", async () => {
    const updateStockMock = {
      execute: jest.fn(), // no importa, no se usará
    } as unknown as UpdateStock;

    app.use("/stock", createStockRouter(updateStockMock));

    const response = await request(app)
      .put("/stock/UpdateStockProduct")
      .send({
        id_products: "not-a-number",
        available: "not-a-number",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid input types" });
  });

  it("debería retornar 500 si el caso de uso lanza un error", async () => {
    const updateStockMock = {
      execute: jest.fn().mockRejectedValue(new Error("DB update failed")),
    } as unknown as UpdateStock;

    app.use("/stock", createStockRouter(updateStockMock));

    const response = await request(app)
      .put("/stock/UpdateStockProduct")
      .send({
        id_products: 1,
        available: 10,
      });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: "Error updating stock",
      error: "DB update failed",
    });
  });
});
