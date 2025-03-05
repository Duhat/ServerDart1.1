const Router = require('express');
const router = new Router();
const categoryRouter = require('./categoryRouter');  // Убедитесь, что путь правильный
const userRouter = require('./userRouter');
const videoRouter = require('./videoRouter');
const likeRouter = require('./likeRouter'); // Добавлена роута для лайков
const roleRouter = require('./roleRouter'); // Добавлена роута для ролей


router.use('/category', categoryRouter);  // Роуты для категорий
router.use('/user', userRouter);  // Роуты для пользователей
router.use('/video', videoRouter);  // Роуты для видео
router.use('/like', likeRouter); //
router.use('/role', roleRouter); //


module.exports = router;
