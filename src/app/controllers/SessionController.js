import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Email ou Senha inválidos' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Email ou Senha inválidos' });
    }

    const { id, nome, telefones, createdAt, updatedAt } = user;

    return res.json({
      user: {
        id,
        nome,
        email,
        telefones,
        createdAt,
        updatedAt,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
