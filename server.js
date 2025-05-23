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

connectDB(); //JAUNS

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
/*NEVAJAG
app.use(async (req, res, next) => {
  await connectDB();
  next();
});
*/
// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully!' });
});

// Only start server if not in serverless environment (like Vercel)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

module.exports = app;
