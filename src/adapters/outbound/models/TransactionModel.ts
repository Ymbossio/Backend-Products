import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement} from "sequelize-typescript";

export interface TransactionsAttributes {
  id_transaction: number;  
  id_transaction_gateway: string;
  payment_method: string;
  type_card: string;
  card_holder: string;
  status: string;
}


export interface TransactionsCreationAttributes {
  id_transaction_gateway: string;
  payment_method: string;
  type_card: string;
  card_holder: string;
  status: string;
}

@Table({
  tableName: "transaction",
  timestamps: false,
})


export class TransactionModel extends Model<TransactionsAttributes,TransactionsCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_transaction!: number;

  @Column(DataType.STRING)
  id_transaction_gateway!: string;

  @Column(DataType.STRING)
  payment_method!: string;

  @Column(DataType.STRING)
  type_card!: string;

  @Column(DataType.STRING)
  card_holder!: string;

  @Column(DataType.STRING)
  status!: string;

}