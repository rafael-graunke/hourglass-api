import bcrypt from 'bcrypt';
import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      if (!req.body)
        return res.status(400).json({ errors: ['Nenhum dado enviado.'] });
      if (!req.body.user)
        return res.status(400).json({ errors: ['Usuário não informado.'] });
      if (!req.body.pass)
        return res.status(400).json({ errors: ['Senha não informada.'] });

      const users = await User.findAll();

      if (users.length > 0)
        return res
          .status(403)
          .json({ errors: ['Não é possível cria novo usuário.'] });

      const user = await User.create({
        user: req.body.user,
        pass: bcrypt.hashSync(req.body.pass, 10),
      });

      return res.json({ id: user.id, user: user.user });
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
