// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            
            // Проверка наличия роли в токене
            if (!decoded.roleId) {
                return res.status(403).json({ message: 'No role provided in token' });
            }

            // Проверка, что роль пользователя входит в список разрешенных ролей
            if (!roles.includes(decoded.roleId)) {
                return res.status(403).json({ message: 'No access' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
};
