import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Relatorio from '../models/Relatorio';

const models = [Relatorio];

const connection = new Sequelize(dbConfig);

models.forEach((model) => {
  model.init(connection);
});
