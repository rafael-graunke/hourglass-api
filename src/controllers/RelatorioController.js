import Relatorio from '../models/Relatorio';

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
}

export default new RelatorioController();
