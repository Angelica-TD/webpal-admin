const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.render('view-product', { title: `${id}`, productId: id });
});


module.exports = router;
