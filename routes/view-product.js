const express = require('express');
const fs = require('fs');
const router = express.Router();
const db = require('../db');

router.get('/:productCode', async (req, res) => {
  try {
    const { productCode } = req.params;
    const sql = `SELECT * FROM products WHERE product_code = ?`;
    const result = await db.query(sql, [productCode]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    
    res.render('view-product', { title: `${productCode}`, productCode: result[0].product_code, productName: result[0].name });

  } catch (error) {

    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });

  } 
});


module.exports = router;
