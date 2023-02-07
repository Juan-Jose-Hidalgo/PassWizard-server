import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import routes dynamically.
import { router } from './routes';

const app = express();

//* MIDDLEWARES

app.use(router);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan('dev'));

export default app;