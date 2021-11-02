import dotenv from 'dotenv';
import path from 'path';

const loadEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  dotenv.config({
    path: path.join(__dirname, '..', 'env', `${env}.env`),
  });
};

loadEnv();
