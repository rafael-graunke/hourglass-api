import { Model, DataTypes } from 'sequelize';

export default class Hora extends Model {
  static init(sequelize) {
    super.init(
      {
        idEntidade: DataTypes.INTEGER,
        segundos: DataTypes.BIGINT,
      },
      {
        sequelize,
        modelName: 'Hora',
      }
    );
    return this;
  }
}
