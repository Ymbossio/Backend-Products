import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, HasOne } from "sequelize-typescript";
import { StockModel } from "./StockModel";

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

export interface ProductCreationAttributes {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;}

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model<ProductAttributes, ProductCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  category!: string;

  @Column(DataType.STRING)
  image!: string;

  @HasOne(() => StockModel, { foreignKey: 'id_product' })
  stock!: StockModel;

}
