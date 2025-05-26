import { StockController } from "../../src/adapters/inbound/http/StockController";
import { Request, Response } from "express";

describe("StockController unit tests", () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it("PUT /UpdateStockProduct - actualiza stock correctamente", async () => {
    const updateStockMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };

    const controller = new StockController(updateStockMock as any);

    const req = {
      body: {
        id_products: 1,
        available: 10,
      },
    } as Request;

    const res = mockResponse();

    await controller.updateStock(req, res);

    expect(updateStockMock.execute).toHaveBeenCalledWith(1, 10);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Stock updated successfully" });
  });

  it("PUT /UpdateStockProduct - responde 400 si tipos inválidos", async () => {
    const updateStockMock = {
      execute: jest.fn(),
    };

    const controller = new StockController(updateStockMock as any);

    const req = {
      body: {
        id_products: "not_a_number",
        available: "also_not_a_number",
      },
    } as any;

    const res = mockResponse();

    await controller.updateStock(req, res);

    expect(updateStockMock.execute).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid input types" });
  });

  it("PUT /UpdateStockProduct - responde 500 si hay error inesperado", async () => {
    const updateStockMock = {
      execute: jest.fn().mockRejectedValue(new Error("DB error")),
    };

    const controller = new StockController(updateStockMock as any);

    const req = {
      body: {
        id_products: 1,
        available: 10,
      },
    } as Request;

    const res = mockResponse();
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});

    await controller.updateStock(req, res);

    expect(updateStockMock.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error updating stock",
      error: "DB error",
    });

    consoleErrorMock.mockRestore();
  });
});
