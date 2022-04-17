import Hora from '../models/Hora';

class HoraController {
  async index(req, res) {
    try {
      const hora = await Hora.findOne({
        where: {
          idEntidade: req.params.id,
        },
      });
      return res.json(hora);
    } catch (e) {
      console.error(e);
    }
  }

  async create(req, res) {
    try {
      const relatorio = await Hora.create(req.body);
      return res.json(relatorio);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new HoraController();
