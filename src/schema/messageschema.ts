import mongoose from 'mongoose';

const Schema = mongoose.Schema;


interface Imessages extends mongoose.Document {
    email: string;
    date: Date;
    text: any;
}

const messageSchema = new Schema({
    email: String,
    date: String,
    text: String
})


export const messagesSchema = mongoose.model('mensajes', messageSchema);