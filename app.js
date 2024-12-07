const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const serviceRoutes = require('./routes/serviceroutes');
const reservationRoutes = require('./routes/reservationroutes');
const cors = require("cors");


require('dotenv').config();

const app = express();
connectDB();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/reservations', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
