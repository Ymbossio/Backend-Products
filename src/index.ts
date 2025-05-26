import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import {createSequelizeInstance} from "./infrastructure/databases/Sequelice";
import productsRouter from "./routes/productsRoutes";
import { createStockRouter } from "./routes/StockRoutes";
import {createTransactionRouter  } from "./routes/Transaction";
import { createDeliveryRouter } from "./routes/DeliveriesRoutes";

import { UpdateStock } from "./domains/useCases/UpdateStock";
import { CreateTransaction } from "./domains/useCases/CreateTransaction";
import { CreateDelivery } from "./domains/useCases/CreateDeliveries";
import { SequelizeStockRepository } from "./adapters/outbound/db/SequelizeStockRepository";
import { SequelizeTransactionRepository } from "./adapters/outbound/db/SequelizeTransactionRepository";
import { SequelizeDeliveryRepository } from "./adapters/outbound/db/SequelizeDeliveriesRepository";
import { Sequelize } from "sequelize-typescript";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const stockRepository = new SequelizeStockRepository();
const createTransaction = new SequelizeTransactionRepository();
const createDeliveries = new SequelizeDeliveryRepository();

const updateStockUseCase = new UpdateStock(stockRepository);
const createTransactions =  new CreateTransaction(createTransaction)
const createDeliveryUseCase = new CreateDelivery(createDeliveries)

app.use('/api/products', productsRouter);
app.use('/api/stock', createStockRouter(updateStockUseCase));

app.use('/api/transaction', createTransactionRouter(createTransactions));
app.use('/api/deliveries', createDeliveryRouter(createDeliveryUseCase));

const PORT = process.env.PORT ?? 4000;

async function startServer() {
  try {
    const sequelize = createSequelizeInstance();  // aquí creas la instancia
    await sequelize.sync();  
    console.log('connection to database success');
    const server = app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });

    app.get('/', (req, res) => {
      res.send('<h1>This server Run 🚀</h1>');
    });

    return server;

  } catch (error) {
    console.error('Error al conectar o sincronizar la base de datos:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

export default app;
