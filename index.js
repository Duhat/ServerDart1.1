require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
// server.js
const router = require('./routes/index');  // Убедитесь, что путь правильный

//const fileUpload = require('express-fileupload');
//const models = require('./models/models'); 
const errorHendler = require('./middleware/ErrorHandlingMiddleWare');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
//app.use(fileUpload({}));
app.use('/api', router);

//обработка ошибок
app.use(errorHendler);


app.get('/', (req, res) => {
    res.status(200).json({ message: 'root' });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
