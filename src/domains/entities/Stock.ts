export class Stock {
  constructor(
    public id_stock: number,
    public id_product: number,
    public available: number
  ) {}

  updateAvailable(newAvailable: number): void {
    this.available = newAvailable;
  }
}