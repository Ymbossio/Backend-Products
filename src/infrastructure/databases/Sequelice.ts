import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../adapters/outbound/models/ProductModel"
import { StockModel } from "../../adapters/outbound/models/StockModel"

import * as dotenv from 'dotenv'

dotenv.config();


const port = process.env.NODE_PORT ? parseInt(process.env.NODE_PORT, 10) : undefined

const dialectOptions = process.env.NODE_ENV !== 'development'
  ? {
    postgres: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
  : {}


  const sequelize = new Sequelize({
    dialect: process.env.NODE_DIALECT as 'postgres',  
    host: process.env.NODE_HOST,
    username: process.env.NODE_USER,
    password: process.env.NODE_PASSWORD,
    port: port,
    database: process.env.NODE_DATABASE,
    dialectOptions: dialectOptions['postgres'] || {},
    models: [ProductModel, StockModel],
    logging: false,
  });
  
  export default sequelize;