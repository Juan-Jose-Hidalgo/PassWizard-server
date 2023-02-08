import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import routes dynamically.
import { router } from './routes';

const app = express();

//* MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

export default app;