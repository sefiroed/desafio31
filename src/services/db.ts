import mongoose from 'mongoose';
import Config from '../config';

export const connectDb = () => {
  console.log(Config.MONGO_ATLAS_URL)
  return mongoose.connect(Config.MONGO_ATLAS_URL, {});
};
