import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Relatorio from '../models/Relatorio';
import Email from '../models/Email';

const models = [Relatorio, Email];

const connection = new Sequelize(dbConfig);

models.forEach((model) => {
  model.init(connection);
});
