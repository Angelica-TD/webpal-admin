const express = require('express');
const fs = require('fs');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const hasDeleteFunction = true;
    db.query('SELECT * FROM products', (err, products) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error executing query' });
      }
      res.render('all-products', { title: 'All Products', products, hasDeleteFunction });
    });
  });


module.exports = router;
