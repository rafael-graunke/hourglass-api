import { Model, DataTypes } from 'sequelize';

export default class Relatorio extends Model {
  static init(sequelize) {
    super.init(
      {
        idEntidade: DataTypes.INTEGER,
        dataInicial: DataTypes.DATEONLY,
        dataFinal: DataTypes.DATEONLY,
        dataGerado: DataTypes.DATEONLY,
        nomeArquivo: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Relatorio',
      }
    );
    return this;
  }
}
