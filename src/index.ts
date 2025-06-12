import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createSequelizeInstance } from "./infrastructure/databases/Sequelice";
import productsRouter from "./routes/productsRoutes";
import { createStockRouter } from "./routes/StockRoutes";
import { TransactionActions } from "./routes/Transaction";
import { createDeliveryRouter } from "./routes/DeliveriesRoutes";
import { gangsWayRouter } from "./routes/GangsWay";

import { UpdateStock } from "./domains/useCases/UpdateStock";
import { CreateTransaction } from "./domains/useCases/CreateTransaction";
import { UpdateTransaction } from "./domains/useCases/UpdateTransaction";
import { CreateDelivery } from "./domains/useCases/CreateDeliveries";
import { TokenizeCard } from "./domains/useCases/TokenizeCard";

import { SequelizeStockRepository } from "./adapters/outbound/db/SequelizeStockRepository";
import { SequelizeTransactionRepository } from "./adapters/outbound/db/SequelizeTransactionRepository";
import { SequelizeDeliveryRepository } from "./adapters/outbound/db/SequelizeDeliveriesRepository";
import { HttpCardTokenizationService } from "./adapters/outbound/http/HttpCardTokenizationService";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const stockRepository = new SequelizeStockRepository();

const transactionRepository = new SequelizeTransactionRepository();
const deliveryRepository = new SequelizeDeliveryRepository();
const gangsWayService = new HttpCardTokenizationService();

const updateStockUseCase = new UpdateStock(stockRepository);

const createTransactionUseCase = new CreateTransaction(transactionRepository);
const updateTransactionUseCase = new UpdateTransaction(transactionRepository);
const tranferenceUseCase = new TokenizeCard(gangsWayService)
const createDeliveryUseCase = new CreateDelivery(deliveryRepository);

app.use('/api/products', productsRouter);
app.use('/api/stock', createStockRouter(updateStockUseCase));
app.use('/api/gangsway', gangsWayRouter(tranferenceUseCase));
app.use(
  '/api/transaction',
  TransactionActions(createTransactionUseCase, updateTransactionUseCase)
);

app.use('/api/deliveries', createDeliveryRouter(createDeliveryUseCase));

const PORT = process.env.PORT ?? 4000;

async function startServer() {
  try {
    const sequelize = createSequelizeInstance();
    await sequelize.sync();
    console.log('connection to database success');

    app.get('/', (req, res) => {
      res.send('<h1>This server Run 🚀</h1>');
    });

    const server = app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
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
