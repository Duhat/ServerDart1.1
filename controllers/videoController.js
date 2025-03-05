const { Video, Category } = require('../models/models');
const ApiError = require('../error/ApiError');

class VideoController {
    // Создание видео
    async create(req, res, next) {
        try {
            const { title, description, iframe, date, categoryId } = req.body;

            // Проверяем, существует ли категория
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const video = await Video.create({ title, description, iframe, date, categoryId });
            return res.json(video);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // Получение всех видео
    async getAll(req, res, next) {
        try {
            const videos = await Video.findAll({
                include: [{ model: Category, attributes: ['name'] }],
            });
            return res.json(videos);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // Получение видео по ID
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const video = await Video.findByPk(id, {
                include: [{ model: Category, attributes: ['name'] }],
            });
    
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }
    
            // Получаем количество лайков
            const likesCount = await Like.count({ where: { videoId: id } });
    
            return res.json({ ...video.toJSON(), likesCount });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // Обновление видео
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, iframe, date, categoryId } = req.body;

            const video = await Video.findByPk(id);
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }

            // Проверяем, существует ли новая категория (если обновляется)
            if (categoryId) {
                const category = await Category.findByPk(categoryId);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
            }

            // Обновляем данные
            video.title = title || video.title;
            video.description = description || video.description;
            video.iframe = iframe || video.iframe;
            video.date = date || video.date;
            video.categoryId = categoryId || video.categoryId;

            await video.save();
            return res.json(video);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // Удаление видео
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const video = await Video.findByPk(id);
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }

            await video.destroy();
            return res.json({ message: 'Video deleted successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new VideoController();
