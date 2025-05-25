import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo
} from "sequelize-typescript";
import { ProductModel } from "./ProductModel";


export interface StockUpdateAttributes {
  id_products: number;
  available: number;
}

export interface StockAttributes {
  id_stock: number;
  id_product: number;
  available: number;
}


@Table({
  tableName: "stock",
  timestamps: false,
})

export class StockModel extends Model<StockAttributes, StockUpdateAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_stock!: number;

  @Column(DataType.INTEGER)
  id_product!: number;

  @Column(DataType.INTEGER)
  available!: number;

  @BelongsTo(() => ProductModel, { foreignKey: 'id_product' })
  product!: ProductModel;


}