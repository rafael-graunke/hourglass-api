module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'horas',
      'ultima_notificacao',
      Sequelize.INTEGER
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Horas',
      'ultima_notificacao',
      Sequelize.INTEGER
    );
  },
};
