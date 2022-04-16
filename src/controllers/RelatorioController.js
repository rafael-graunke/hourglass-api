import Relatorio from '../models/Relatorio';
import glpiDatabase from '../config/glpiDatabase';

class RelatorioController {
  async index(req, res) {
    try {
      const relatorios = await Relatorio.findAll({
        where: {
          idEntidade: req.params.id,
        },
      });
      return res.json(relatorios);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const relatorios = await Relatorio.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.json(relatorios);
    } catch (e) {
      console.error(e);
    }
  }

  async create(req, res) {
    try {
      const relatorio = { ...req.body };
      const nomeArquivo = 'teste'; // TODO: Retornar após gerar PDF
      relatorio.nomeArquivo = nomeArquivo;
      const relatorioGerado = await Relatorio.create(relatorio);

      if (relatorioGerado) {
        return res.send(relatorioGerado);
      }
      return res.status(404).send({
        error: 'Não foi possível gerar o PDF',
      });
    } catch (e) {
      return res.status(404).send({
        error: 'Não foi possível gerar o PDF',
      });
    }
  }
}

export default new RelatorioController();
