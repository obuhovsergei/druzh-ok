import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from '@/routes/auth.routes';
import { errorHandler } from '@/middlewares/error-handler';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const api_prefix = process.env.API_ROUTE_PREFIX || 'api'
app.use(`/${api_prefix}/auth`, authRoutes);

// Error handler
app.use(errorHandler);

export default app;
