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
app.use((req, res, next) => {
    console.log('CORS middleware loaded successfully');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(router); //Aquí cargo las rutas de manera dinámica.

export default app;