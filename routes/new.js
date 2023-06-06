const express = require('express');
const fs = require('fs');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  res.render('add-product', { title: 'Add new product' });
});

router.post('/', async (req, res, next) => {
  try {
    const { id, productName } = req.body;
    if(!id || !productName){
      return res.status(404).json({ error: 'Required fields' });
    }
    // Check if ID already exists
    const idExists = await db.query('SELECT id FROM products WHERE id = ?', [id]);

    if (idExists.length > 0) {
      // ID already exists, send an error message
      return res.status(400).json({ error: 'ID already exists' });
    }

    const newProduct = {
      id: id,
      name: productName,
      description: 'sample description'
    };

    await db.query('INSERT INTO products SET ?', newProduct);

    res.send({ id });

  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
