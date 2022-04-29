import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        user: DataTypes.STRING,
        pass: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
    return this;
  }
}
