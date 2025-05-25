import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo} from "sequelize-typescript";

export interface StockAttributes {
  id_transaction: number;  
  id_transaction_gateway: string;
  payment_method: string;
  type_card: string;
  card_holder: string;
  status: string;
}


export interface StockCreationAttributes {
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


export class TransactionModel extends Model<StockAttributes, StockCreationAttributes> {
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