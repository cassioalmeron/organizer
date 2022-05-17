import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import routes from './routes';
import errorHandler from './errorHandler';

import './database';
import './container';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server is running on port ${process.env.APP_PORT}!`),
);
