import User from '../models/User';

class UserController {
    async store(req,res){
        const userExists = await User.findOne({where: {email: req.body.email}});
        
        if(userExists){
            return res.status(400).json({error: 'Email já existente'});
        }
        const {name, email, password_hash, phone_number, createdAt, updatedAt} = await User.create(req.body);

        return res.json({
            name,
            email,
            password_hash,
            phone_number,
            createdAt,
            updatedAt
        });
    }

    async update(req,res){
        return res.json({ok: true});
    }

    async show(req,res){
        const {id} = req.params;
        const userId = await User.findByPk(id);
        if (!userId)
        return res.status(400).json({ error: 'Usuario não encontrado.'})

        return res.json(userId);
    }
}

export default new UserController();