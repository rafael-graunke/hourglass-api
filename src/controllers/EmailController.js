import Email from '../models/Email';

class EmailController {
  async index(req, res) {
    try {
      const emails = await Email.findAll({
        where: {
          idEntidade: req.params.id,
        },
      });
      return res.json(emails);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const email = await Email.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.json(email);
    } catch (e) {
      console.error(e);
    }
  }

  async create(req, res) {
    try {
      const relatorio = await Email.create(req.body);
      return res.json(relatorio);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new EmailController();
