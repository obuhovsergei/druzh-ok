import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from '@/routes/auth.routes';
import dogsRoutes from '@/routes/dogs.routes';
import { errorHandler } from '@/middlewares/error-handler';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dogs', dogsRoutes);

// Error handler
app.use(errorHandler);

export default app;
