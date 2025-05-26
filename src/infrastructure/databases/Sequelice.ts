import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../adapters/outbound/models/ProductModel"
import { StockModel } from "../../adapters/outbound/models/StockModel"
import { TransactionModel } from "../../adapters/outbound/models/TransactionModel"
import { DeliveryModel } from "../../adapters/outbound/models/DeliveriesModel"
import * as dotenv from 'dotenv';

dotenv.config();

export function createSequelizeInstance(): Sequelize {
  const port = process.env.NODE_PORT ? parseInt(process.env.NODE_PORT, 10) : undefined;

  const dialectOptions = process.env.NODE_ENV !== 'development'
    ? {
        postgres: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    : {};

  return new Sequelize({
    dialect: process.env.NODE_DIALECT as 'postgres',
    host: process.env.NODE_HOST,
    username: process.env.NODE_USER,
    password: process.env.NODE_PASSWORD,
    port,
    database: process.env.NODE_DATABASE,
    dialectOptions: dialectOptions['postgres'] || {},
    models: [ProductModel, StockModel, TransactionModel, DeliveryModel],
    logging: false,
  });
}
