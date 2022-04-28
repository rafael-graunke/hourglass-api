module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.changeColumn('Horas', 'ultima_notificacao', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
    ]),

  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.changeColumn('Horas', 'ultima_notificacao', {
        type: Sequelize.INTEGER,
      }),
    ]),
};
