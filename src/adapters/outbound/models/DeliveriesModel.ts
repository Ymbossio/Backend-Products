import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

export interface DeliveriesAttributes {
  id_deliveries: number;  
  names: string;
  address: string;
  id_transaction: string;
}

export interface DeliveriesCreationAttributes {
  names: string;
  address: string;
  id_transaction: string;
}


@Table({
  tableName: "deliveries",
  timestamps: false,
})

export class DeliveryModel extends Model<DeliveriesAttributes, DeliveriesCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_deliveries!: number;

  @Column(DataType.STRING(200))
  names!: string;

  @Column(DataType.STRING(200))
  address!: string;

  @Column(DataType.INTEGER)
  id_transaction!: string;
}
