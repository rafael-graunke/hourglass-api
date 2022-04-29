module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('relatorios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_entidade: {
        type: Sequelize.INTEGER,
      },
      data_inicial: {
        type: Sequelize.DATEONLY,
      },
      data_final: {
        type: Sequelize.DATEONLY,
      },
      data_gerado: {
        type: Sequelize.DATEONLY,
      },
      nome_arquivo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('relatorios');
  },
};
