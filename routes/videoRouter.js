const express = require('express');
const router = new express.Router(); // Исправлено на new express.Router()
const VideoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleWare');

router.post('/', authMiddleware([1]), VideoController.create); // Добавить видео доступно только администраторам

router.get('/', VideoController.getAll); // Получить все видео (доступно всем)
router.get('/:id', VideoController.getById); // Получить видео по ID (доступно всем)

router.put('/:id', authMiddleware([1]), VideoController.update); // Обновить видео доступно только администраторам

router.delete('/:id', authMiddleware([1]), VideoController.delete); // Удалить видео доступно только администраторам

module.exports = router;
