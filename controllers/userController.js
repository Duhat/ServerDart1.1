const { User, Role } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
require('dotenv').config();

const generateJwt = (id, email, roleId) => {
    return jwt.sign({ id, email, roleId }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
    // Регистрация пользователя
    async register(req, res, next) {
        try {
            const { name, email, password, roleId } = req.body;
    
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
    
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
    
            const hashPassword = await bcrypt.hash(password, 10); // Увеличено количество итераций
            const user = await User.create({ name, email, password: hashPassword, roleId: roleId || 2 });
    
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                roleId: user.roleId
            }, process.env.SECRET_KEY, {
                expiresIn: '24h' // Время жизни токена
            });
    
            return res.json({ token });
        } catch (error) {
            console.error('Registration error:', error);
            next(ApiError.badRequest(error.message));
        }
    }

    // Аутентификация пользователя (логин)
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = generateJwt(user.id, user.email, user.roleId);
            return res.json({ token });
        } catch (error) {
            console.error('Login error:', error);
            next(ApiError.badRequest(error.message));
        }
    }

    // Проверка токена
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.roleId);
        return res.json({ token });
    }

    // Получение всех пользователей
    async getAll(req, res, next) {
        try {
            const users = await User.findAll({
                include: { model: Role, attributes: ['id', 'name'] }
            });

            return res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            next(ApiError.badRequest(error.message));
        }
    }

    // Удаление пользователя
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await user.destroy();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new UserController();
