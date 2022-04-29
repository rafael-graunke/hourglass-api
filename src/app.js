import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import './database';

import session from 'express-session';
import relatorioRoutes from './routes/relatorio.js';
import emailRoutes from './routes/email.js';
import horaRoutes from './routes/hora';
import entidadeRoutes from './routes/entidade';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import config from './config/config';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        secret: config.sessionSecret,
        saveUninitialized: true,
        resave: false,
        cookie: {
          httpOnly: true,
          maxAge: config.sessionMaxAge,
        },
      })
    );
  }

  routes() {
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/user', userRoutes);
    this.app.use('/api/relatorios', relatorioRoutes);
    this.app.use('/api/emails', emailRoutes);
    this.app.use('/api/horas', horaRoutes);
    this.app.use('/api/entidades', entidadeRoutes);
    this.app.use('/api/files', express.static(`${__dirname}/files`));
  }
}

export default new App().app;
