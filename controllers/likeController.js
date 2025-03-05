const { Like, User, Video } = require('../models/models');
const ApiError = require('../error/ApiError');

class LikeController {
    // ✅ Поставить лайк
    async create(req, res, next) {
        try {
            const { userId, videoId } = req.body;

            // Проверяем, существует ли пользователь и видео
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const video = await Video.findByPk(videoId);
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }

            // Проверяем, ставил ли уже лайк
            const existingLike = await Like.findOne({ where: { userId, videoId } });
            if (existingLike) {
                return res.status(400).json({ message: 'Like already exists' });
            }

            // Создаём лайк
            const like = await Like.create({ userId, videoId });
            return res.json(like);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // ✅ Удалить лайк
    async delete(req, res, next) {
        try {
            const { userId, videoId } = req.body;

            // Проверяем, есть ли лайк
            const like = await Like.findOne({ where: { userId, videoId } });
            if (!like) {
                return res.status(404).json({ message: 'Like not found' });
            }

            await like.destroy();
            return res.json({ message: 'Like removed' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // ✅ Получить количество лайков у видео
    async getLikes(req, res, next) {
        try {
            const { videoId } = req.params;
            const likesCount = await Like.count({ where: { videoId } });
            return res.json({ videoId, likesCount });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new LikeController();
