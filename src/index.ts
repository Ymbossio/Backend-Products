import express from "express"
import cors from 'cors'
import * as dotenv from 'dotenv'
import sequelize from "./infrastructure/databases/Sequelice";
import router from "./routes/productsRoutes";
import stockRouter from "./routes/StockRoutes";

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api',router)
app.use('/api',stockRouter)

const PORT = process.env.PORT ?? 4000

async function startServer() {
  try {

    await sequelize.sync();
    console.log('connection to database success');
    const server = app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });

    app.get('/', (req, res)=>{
      res.send('<h1>This server Run 🚀</h1>');
    })

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