import dotenv from 'dotenv';
dotenv.config();



export default {
  MONGO_ATLAS_URL: `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`,
  PORT: process.env.PORT || 8080,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
};



