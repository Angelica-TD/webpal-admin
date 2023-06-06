const express = require('express');
const fs = require('fs');
const router = express.Router();
const db = require('../db');



router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM products WHERE id = ?`;
    const result = await db.query(sql, [id]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    
    const productName = result[0].name;
    res.render('view-product', { title: `${id}`, productId: productName });

  } catch (error) {

    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });

  } 


  
});


module.exports = router;
