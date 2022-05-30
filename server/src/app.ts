import path from 'path';
import express from 'express';
import type { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import v1Router from './routes/apis/v1';
const app: express.Application = express();
import './config/passport-jwt.config';

/**
 * Middlewares
 */
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(passport.initialize());
app.use('/v1', v1Router);

const errorHander: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Error received here', err);
  return res.status(err.status).json({
    message: err.message,
  });
};
app.use(errorHander);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default app;
