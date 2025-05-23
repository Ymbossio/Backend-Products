import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

export interface TransacctionAttributes {
  id_transaction: number;
  card_number: number;
  status_transaction: number;
}

export interface TransactionCreationAttributes {
  card_number: number;
  status_transaction: number;
}

@Table({
  tableName: "transaction",
  timestamps: false,
})
export class TransactionModel extends Model<TransacctionAttributes, TransactionCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_transaction!: number;

  @Column(DataType.INTEGER)
  card_number!: number;

  @Column(DataType.INTEGER)
  status_transaction!: number;
}
