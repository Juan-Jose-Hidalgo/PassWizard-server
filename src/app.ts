import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

// Import routes dynamically.
import { router } from './routes';

const app = express();

//* MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(router);
app.use('/ping', (req, res) => res.send('pong'));

export default app;