export class Products {
  constructor(
    public id: number | null,
    public name: string,
    public price: number,
    public description: string,
    public category: string,
    public image: string,
    public stock: number
  ) {}
}
