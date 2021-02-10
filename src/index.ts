import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import mongodb from './configs/dataBase';
import RabbitMq from './providers/rabbitMq';
import ServiceStock from './modules/products/services/stock.service';
mongodb();

const app = express();
const port = 3333;
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(cors());

app.get('/', async (req, res) => {
  res.send('Health check');
});

app.listen(port, () => {
  console.log(`Application is running http://localhost:${port}`);
});

RabbitMq.getConnection().startRecursive()
      .then((amqp) => amqp.consume('products', ServiceStock.getProductsQueue));