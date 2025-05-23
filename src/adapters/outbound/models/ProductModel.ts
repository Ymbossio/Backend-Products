
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
}

export interface ProductCreationAttributes {
  name: string;
  price: number;
}

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
}
