const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleWare');

router.post('/register', UserController.register); // Регистрация
router.post('/login', UserController.login); // Вход
router.get('/auth', authMiddleware, UserController.check); // Проверка токена
router.get('/', authMiddleware, UserController.getAll); // Получить всех пользователей
router.delete('/:id', authMiddleware, UserController.delete); // Удалить пользователя

module.exports = router;
