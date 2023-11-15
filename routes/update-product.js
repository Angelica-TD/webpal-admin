const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
const db = require('../db');

router.put('/', async (req, res, next) => {
  try {
    const { id, productCode, productName, description, price } = req.body;
    if (!productCode || !productName) {

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

router.post('/images', async (req, res, next) => {
  try {

    const { imageId, imageName, productCode, productId } = req.body;

    const imagePath = 'public/uploads/' + imageName;

    await fs.unlink(imagePath);

    await db.query('DELETE FROM images WHERE id = ?', [imageId]);

    res.redirect(`/view-product/${productCode}/${productId}/upload-images`);

  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
