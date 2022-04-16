import { Model, DataTypes } from 'sequelize';

export default class Email extends Model {
  static init(sequelize) {
    super.init(
      {
        idEntidade: DataTypes.INTEGER,
        endereco: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Email',
      }
    );
    return this;
  }
}
