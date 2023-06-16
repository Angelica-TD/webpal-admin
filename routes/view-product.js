const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../db');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/:productCode', async (req, res) => {
  try {
    const { productCode } = req.params;
    const sql = `SELECT * FROM products WHERE product_code = ?`;
    const result = await db.query(sql, [productCode]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    
    res.render('view-product',
    { 
      title: `${productCode}`,
      id: result[0].id,
      productCode: result[0].product_code,
      productName: result[0].name,
      productDescription: result[0].description,
      price: result[0].price
    });

  } catch (error) {

    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });

  } 
});

router.get('/:productCode/upload-images', (req, res) => {
  const { productCode } = req.params;
  res.render('upload-images', { title: `Upload images for ${ productCode }`});
});

router.post('/:productCode/upload-images', upload.array('images'), (req, res) => {
  const { productCode } = req.params;

  const file = req.file;

  res.send('ok');

});


module.exports = router;
