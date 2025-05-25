
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
  image: string;
  stock: number;
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

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  category!: string;

  @Column(DataType.STRING)
  image!: string;

  @Column(DataType.NUMBER)
  stock!: number;

}
