const express = require('express');
const router = express.Router();
const db = require('../db');

router.put('/', async (req, res, next) => {
  console.log('reached router');
  try {
    const { id, productCode, productName, description, price } = req.body;
    if(!productCode || !productName){
      
      return res.status(404).json({ error: 'Required fields' });
    }
    
    const product = await db.query('UPDATE products SET product_code = ?, name = ?, description = ?, price = ? WHERE id = ?', [productCode, productName, description, price, id]);

    if (product.length < 0) {
      return res.status(400).json({ error: 'Product does not exist' });
    }

    res.send({ productCode });

  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
