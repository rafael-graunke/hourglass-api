import bcrypt from 'bcrypt';
import User from '../models/User';

class AuthController {
  async create(req, res) {
    try {
      if (!req.body)
        return res.status(400).json({ errors: ['Nenhum dado enviado.'] });
      if (!req.body.user)
        return res.status(400).json({ errors: ['Usuário não informado.'] });
      if (!req.body.pass)
        return res.status(400).json({ errors: ['Senha não informada.'] });

      const user = await User.findOne({
        where: { user: req.body.user },
      });

      if (!user)
        return res.status(404).json({ errors: ['Usuário não encontrado'] });

      const podeLogar = bcrypt.compareSync(req.body.pass, user.pass);
      if (!podeLogar)
        return res.status(403).json({ errors: ['Senha incorreta'] });

      return res.json({ id: user.id, user: user.user });
    } catch (e) {
      console.error(e);
    }
  }
}

export default new AuthController();
