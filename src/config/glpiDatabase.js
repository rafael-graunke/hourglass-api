import Sequelize from 'sequelize';

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.GLPI_DATABASE,
  process.env.GLPI_USER,
  process.env.GLPI_PASS,
  {
    host: process.env.GLPI_HOST,
    dialect: 'mariadb',
  }
);

export default sequelize;
