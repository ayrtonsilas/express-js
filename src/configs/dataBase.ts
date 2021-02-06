import mongoose from 'mongoose';

export default function (){
    mongoose.connect('mongodb://db:27017/delivery', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log('MongoDB Conectado');
    })
    .catch((error) => {
        console.log(error);
    });
}