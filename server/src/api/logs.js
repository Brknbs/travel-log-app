const { Router } = require('express');
const LogEntry = require('../models/LogEntry');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const logEntries = await LogEntry.find();
    res.json(logEntries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const savedLog = await logEntry.save();
    res.json(savedLog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
  res.json(logEntry);
});

module.exports = router;