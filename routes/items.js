const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
let items = [];

router.post('/', (req, res) => {
  console.log(req.body);
  const newItem = new Item(req.body);

  newItem.save();

  console.log('CREATE SUCSESFULL 201 OK');
  res.status(201).json(newItem);
});

router.get('/', (req, res) => {
  res.json(items);
});

module.exports = router;
