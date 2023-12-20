const mongodb = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
mongodb().then(async () => {
    await app.use(cors(
        {
            origin: ['http://localhost:3000','http://localhost:5000']
        }

    ));
    await app.use(express.json());
    await app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    await app.use('/api',require('./Routes/CreateUser'));
    await app.use('/api',require('./Routes/Displaydata'));
    await app.use('/api',require('./Routes/Orderdata'));
    await app.listen(port, () => {
        console.log(`food app listening on port ${port}`);
    });

}).catch((err)=>{console.log(err)});