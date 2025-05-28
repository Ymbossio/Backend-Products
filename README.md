# 🛠️ API de Productos y Transacciones

Esta API permite gestionar productos, transacciones, entregas y stock en una tienda virtual. Está diseñada para integrarse con un frontend disponible en https://frontend-products-zpdo.onrender.com/, 
donde los usuarios pueden explorar productos y realizar compras mediante la pasarela de pagos integrada desplegada **Render** un servicio Cloud

---
## 🧩 Arquitectura

El proyecto emplea **Arquitectura Hexagonal (Ports & Adapters)**. Esto garantiza que el núcleo de la lógica de negocio esté desacoplado de tecnologías externas como bases de datos, frameworks web y pasarelas de pago.

Beneficios:
- Alta **modularidad** y **escalabilidad**
- Mejor capacidad de **testeo**
- Separación clara entre **dominio**, **infraestructura**, y **aplicación**

---

## 🚀 Tecnologías Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **Sequelize (ORM)**
- **Jest** (para testing)
- **Patrón de diseño Hexagonal**
- **Render** (Provedor Cloud)

---

## Enlances

- Url Repositorio **Github**: https://github.com/Ymbossio/Backend-Products
- Url Despliegue **Render**: https://backend-products-dxmh.onrender.com/ 

---

## 📦 Endpoints Disponibles

### 📦 `/products`
Obtiene los productos disponibles en la tienda
- `GET api/products/GetAllProducts`

### 💳 `/transactions`
- `POST api/transaction/CreateTransaction`: Crear una nueva transacción (inicia el proceso de pago)
- `PUT  api/transactions/UpdateTransaction`: Actualiza el estado de la transacción realizada (APPROVED, DECLINED, VOIDED, ERROR)

### 📬 `/deliveries`
Una vez procesado el pago procede a crear la entrega con la información del producto y cliente
- `POST api/deliveries/CreateDeliveries`: Crear una entrega

### 📦 `/stock`
- `PUT api/stock/UpdateStockProduct`: Actualizar cantidad de productos en stock
---

## 🛒 Flujo General de Compra

1. El usuario navega por los productos en el frontend. https://frontend-products-zpdo.onrender.com/
2. Selecciona uno producto y procede a llenar la información requerida para procesar el pago
3. Se abre un **modal** donde introduce su información de pago.
4. Al completarse el pago, se genera una **transacción**, se actualiza el **stock** y se registra una **entrega**.

---


## 🧪 Testing
Las pruebas han sido desarrolladas con **Jest**. está es la cobertura.

File                                | % Stmts | % Branch | % Funcs | % Lines |
------------------------------------|---------|----------|---------|---------|
All files                           |     100 |    95.45 |     100 |     100 |                   
 adapters/inbound/http              |     100 |      100 |     100 |     100 |                   
  DeliveriesController.ts           |     100 |      100 |     100 |     100 |                   
  ProductsController.ts             |     100 |      100 |     100 |     100 |                   
  StockController.ts                |     100 |      100 |     100 |     100 |                  
  TransactionController.ts          |     100 |      100 |     100 |     100 |                  
 adapters/outbound/db               |     100 |      100 |     100 |     100 |                  
  SequelizeDeliveriesRepository.ts  |     100 |      100 |     100 |     100 |                  
  SequelizeProductRepository.ts     |     100 |      100 |     100 |     100 |                  
  SequelizeStockRepository.ts       |     100 |      100 |     100 |     100 |                  
  SequelizeTransactionRepository.ts |     100 |      100 |     100 |     100 |                  
 adapters/outbound/models           |     100 |      100 |     100 |     100 |                  
  DeliveriesModel.ts                |     100 |      100 |     100 |     100 |                  
  ProductModel.ts                   |     100 |      100 |     100 |     100 |                  
  StockModel.ts                     |     100 |      100 |     100 |     100 |                  
  TransactionModel.ts               |     100 |      100 |     100 |     100 |                  
 domains/entities                   |     100 |      100 |     100 |     100 |                  
  Deliveries.ts                     |     100 |      100 |     100 |     100 |                  
  Products.ts                       |     100 |      100 |     100 |     100 |                  
  Stock.ts                          |     100 |      100 |     100 |     100 |                  
  Transaction.ts                    |     100 |      100 |     100 |     100 |                  
 domains/useCases                   |     100 |      100 |     100 |     100 |                  
  CreateDeliveries.ts               |     100 |      100 |     100 |     100 |                  
  CreateTransaction.ts              |     100 |      100 |     100 |     100 |                  
  GetProducts.ts                    |     100 |      100 |     100 |     100 |                  
  UpdateStock.ts                    |     100 |      100 |     100 |     100 |                  
  UpdateTransaction.ts              |     100 |      100 |     100 |     100 |                  
 infrastructure/databases           |     100 |    83.33 |     100 |     100 |                  
  Sequelice.ts                      |     100 |    83.33 |     100 |     100 |              
 routes                             |     100 |      100 |     100 |     100 |                  
  DeliveriesRoutes.ts               |     100 |      100 |     100 |     100 |                  
  StockRoutes.ts                    |     100 |      100 |     100 |     100 |                  
  Transaction.ts                    |     100 |      100 |     100 |     100 |                  
  productsRoutes.ts                 |     100 |      100 |     100 |     100 |     

  ## Autor
  Yovanis Manuel Bossio Lambraño
