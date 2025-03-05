const Router = require('express');
const router = new Router();
const RoleController = require('../controllers/roleController');

router.post('/', RoleController.create); // Создать роль
router.get('/', RoleController.getAll); // Получить все роли
router.delete('/:id', RoleController.delete); // Удалить роль

module.exports = router;
