const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Roles Model
const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

// Users Model
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

// Categories Model
const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

// Videos Model
const Video = sequelize.define('video', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    iframe: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
});

// Likes Model
const Like = sequelize.define('like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Associations
Role.hasMany(User);
User.belongsTo(Role);

Category.hasMany(Video);
Video.belongsTo(Category);

User.hasMany(Like);
Like.belongsTo(User);

Video.hasMany(Like);
Like.belongsTo(Video);

module.exports = {
    Role,
    User,
    Category,
    Video,
    Like,
};
