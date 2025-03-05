const Router = require('express');
const router = new Router();
const LikeController = require('../controllers/likeController');

router.post('/', LikeController.create); // Поставить лайк
router.delete('/', LikeController.delete); // Убрать лайк
router.get('/:videoId', LikeController.getLikes); // Получить кол-во лайков у видео

module.exports = router;
