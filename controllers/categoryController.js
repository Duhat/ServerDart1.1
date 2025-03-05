const { Category } = require('../models/models'); // Импорт модели
const ApiError = require('../error/ApiError');

class CategoryController {
    // Создание категории
    async create(req, res, next) {
        const { name } = req.body;
        if (!name) {
            return next(ApiError.badRequest('Name is required'));
        }

        const category = await Category.create({ name });
        return res.json(category);
    }

    // Получение списка категорий или одной категории по ID
    async get(req, res, next) {
        try {
            const { id } = req.params;

            if (id) {
                // Если указан ID, возвращаем конкретную категорию
                const category = await Category.findByPk(id);
                if (!category) {
                    return next(ApiError.notFound('Category not found'));
                }
                return res.json(category);
            }

            // Если ID не указан, возвращаем список всех категорий
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            next(ApiError.badRequest(error.message));
        }
    }

    // Обновление категории
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!id || isNaN(Number(id))) {
                return next(ApiError.badRequest('Invalid or missing ID'));
            }

            if (!name || typeof name !== 'string') {
                return next(ApiError.badRequest('Invalid or missing name'));
            }

            const category = await Category.findByPk(id);
            if (!category) {
                return next(ApiError.notFound('Category not found'));
            }

            await category.update({ name });
            return res.json(category);
        } catch (error) {
            console.error('Error updating category:', error);
            next(ApiError.badRequest(error.message));
        }
    }

    // Удаление категории
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                return next(ApiError.badRequest('Invalid or missing ID'));
            }

            const category = await Category.findByPk(id);
            if (!category) {
                return next(ApiError.notFound('Category not found'));
            }

            await category.destroy(); // Удаление категории
            return res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new CategoryController();
