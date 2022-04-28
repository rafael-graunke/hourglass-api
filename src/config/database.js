const config = require('./config');

module.exports = {
  dialect: 'mariadb',
  host: config.databaseHost,
  port: config.databasePort,
  username: config.databaseUser,
  password: config.databasePass,
  database: config.databaseName,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    timezone: config.timezone,
  },
  timezone: config.timezone,
};
