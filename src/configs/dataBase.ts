import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export default function () {
  mongoose
    .connect(
      `${process.env.MONGO_HOST}://db:${process.env.MONGO_PORT}/${process.env.MONGO_COLLECT}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    .then((result) => {
      console.log('MongoDB Connected');
    })
    .catch((error) => {
      console.log(error);
    });
}
