import mongoose from 'mongoose';

const Schema = mongoose.Schema;


interface Iproducts extends mongoose.Document {
    nombre: string;
    precio: number;
    url: string;
  }

const productSchema = new Schema({
    nombre: String,
    precio: Number,
    url: String
})


export const productsSchema = mongoose.model('productos', productSchema);