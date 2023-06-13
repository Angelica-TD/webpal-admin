const express = require('express');
const fs = require('fs-extra');
const router = express.Router();
const db = require('../db');


router.delete('/', async (req, res) => {

  try {
    const { id } = req.body;

    await db.query('DELETE FROM products WHERE id = ?', [id]);

    res.status(200).send();

  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });
  }
  
});

module.exports = router;
