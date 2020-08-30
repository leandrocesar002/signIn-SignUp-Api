import sequelize, {Model, Sequelize} from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            phone_number: Sequelize.JSON,
        },
        {
            sequelize,
        });
    }
}

export default User;