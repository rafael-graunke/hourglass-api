import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Relatorio from '../models/Relatorio';
import Email from '../models/Email';
import Hora from '../models/Hora';

const models = [Relatorio, Email, Hora];

const connection = new Sequelize(dbConfig);

models.forEach((model) => {
  model.init(connection);
});
