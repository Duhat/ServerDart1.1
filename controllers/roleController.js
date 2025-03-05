const { Role } = require('../models/models'); // Импорт модели
const ApiError = require('../error/ApiError');

class RoleController {
    // Создание роли
    async create(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'Role name is required' });
            }

            const role = await Role.create({ name });
            return res.json(role);
        } catch (error) {
            console.error('Error creating role:', error);
            next(ApiError.badRequest(error.message));
        }
    }

    // Получение всех ролей
    async getAll(req, res, next) {
        try {
            const roles = await Role.findAll();
            return res.json(roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
            next(ApiError.badRequest(error.message));
        }
    }

    // Удаление роли
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }

            await role.destroy();
            return res.json({ message: 'Role deleted successfully' });
        } catch (error) {
            console.error('Error deleting role:', error);
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new RoleController();
