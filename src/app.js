import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import './database';

import relatorioRoutes from './routes/relatorio.js';
import emailRoutes from './routes/email.js';

dotenv.config();

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
  }

  routes() {
    this.app.use('/relatorios', relatorioRoutes);
    this.app.use('/emails', emailRoutes);
    this.app.use('/files', express.static(`${__dirname}/files`));
  }
}

export default new App().app;
