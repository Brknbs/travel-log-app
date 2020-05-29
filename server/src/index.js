const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
  else console.log('Connected to database.');
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

app.use('/api/logs', logs);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`App is running on http://localhost:${port}`);
});