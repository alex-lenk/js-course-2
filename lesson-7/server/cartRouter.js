const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();
const pathStats = './server/db/userCart.json'

router.get('/', (req, res) => {
  fs.readFile(pathStats, 'utf-8', ((err, data) => {
    if (err) res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    else res.send(data);
  }))
})

router.post('/', (req, res) => {
  handler(req, res, 'add', pathStats);
})

router.put('/:id', (req, res) => {
  handler(req, res, 'change', pathStats);
})

router.delete('/:id', (req, res) => {
  handler(req, res, 'remove', pathStats);
})

module.exports = router;
