//mongodb+srv://<db_username>:<db_password>@cluster0.yitsy7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//annastestfeb
//ccU8UDsxvnEKVYEV
//ieliekam bibliotēku
const express = require('express');
const itemsRouter = require('./routes/items');
const calendarEventsRouter = require('./routes/calendarEvents');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//izveidojam express aplikāciju
const app = express();

//izveidojam portu
const port = process.env.PORT;

const connectDB = async () => {
  try {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const db = process.env.DB_NAME;
    const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.yitsy7l.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Mongobd connection error:', error);
    process.exit(1);
  }
};

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(express.json());
app.use('/items', itemsRouter);
app.use('/calendarEvents', calendarEventsRouter);

//palaizam serveri
/*app.listen(port, () => {
  console.log('server running at port 3001');
});*/

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

module.exports = app;
