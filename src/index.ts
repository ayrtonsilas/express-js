import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import mongodb from './configs/dataBase';
const app = express();
const port = 3333;

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes);
app.use(cors());
mongodb();

app.get('/', (req, res) => {
  res.send('Hello World!s');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
