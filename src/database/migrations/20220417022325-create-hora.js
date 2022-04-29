module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('horas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_entidade: {
        type: Sequelize.INTEGER,
      },
      segundos_disponiveis: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('horas');
  },
};
