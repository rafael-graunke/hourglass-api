import { Model, DataTypes } from 'sequelize';

export default class Hora extends Model {
  static init(sequelize) {
    super.init(
      {
        idEntidade: {
          type: DataTypes.INTEGER,
          unique: true,
        },
        segundosDisponiveis: DataTypes.BIGINT,
      },
      {
        sequelize,
        modelName: 'Hora',
      }
    );
    return this;
  }
}
