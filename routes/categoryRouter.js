const express = require('express');
const router = new express.Router(); // Исправлено на new express.Router()
const CategoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleWare');

// Определение маршрутов для категорий
router.post('/', authMiddleware([1]), CategoryController.create); // Создание категории доступно только администраторам

router.get('/', CategoryController.get); // Получить все категории (доступно всем)
router.get('/:id', CategoryController.get); // Получить категорию по ID (доступно всем)

router.put('/:id', authMiddleware([1]), CategoryController.update); // Обновление категории доступно только администраторам

router.delete('/:id', authMiddleware([1]), CategoryController.delete); // Удаление категории доступно только администраторам

module.exports = router;
