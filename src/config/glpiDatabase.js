import Sequelize from 'sequelize';
import config from './config';

const sequelize = new Sequelize(
  config.glpiDbName,
  config.glpiDbUser,
  config.glpiDbPass,
  {
    host: config.glpiDbHost,
    dialect: 'mariadb',
  }
);

export default sequelize;
