const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const eventRouter = require('./Routes/EventRoute');


const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api', eventRouter);

// Conectar con MongoDB
mongoose.connect('mongodb://localhost:27017/eventsDB')
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
