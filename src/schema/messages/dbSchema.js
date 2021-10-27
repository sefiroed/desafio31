import mongoose from 'mongoose';

const msgCollectionName = 'message';

const messageSchema = new mongoose.Schema({
  author: {
    email: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
    alias: { type: String, required: true, max: 50 },
    edad: { type: Number, required: true },
    url: { type: String, required: true, max: 50 },
  },
  msg: { type: String, required: true, min: 1 },
  timestamp: {type: Date, default : Date.now()}
});

export const messageModel = mongoose.model(msgCollectionName, messageSchema);
