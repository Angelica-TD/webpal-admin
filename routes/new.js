const express = require('express');
const fs = require('fs');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  res.render('add-product', { title: 'Add new product' });
});

router.post('/', async (req, res, next) => {
  try {
    const { productCode, productName, description, price } = req.body;
    if(!productCode || !productName){
      return res.status(404).json({ error: 'Required fields' });
    }
    const productExists = await db.query('SELECT product_code FROM products WHERE product_code = ?', [productCode]);

    if (productExists.length > 0) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    const newProduct = {
      product_code: productCode,
      name: productName,
      description: description,
      price: price
    };

    await db.query('INSERT INTO products SET ?', newProduct);

    res.send({ productCode });

  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
