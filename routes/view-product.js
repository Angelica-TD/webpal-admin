const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../db');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
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

router.get('/:productCode/:productId/upload-images', async (req, res) => {

  try{
    const { productCode, productId } = req.params;

    const imageNames = await db.query('SELECT image_name FROM images WHERE product_id = ?', [productId]);

    res.render('upload-images', { title: `Upload images for ${ productCode }`, productCode, productId, message: req.flash(), imageNames});
  } catch (error) {
    console.error('Error retrieving image files:', error);
    res.status(500).send('Internal Server Error');
  }
  
});

router.post('/:productCode/:productId/upload-images', upload.array('images'), async (req, res) => {

  try{
    const { productCode, productId } = req.params;
    const uploadedFiles = req.files;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      req.flash('error', 'You must select at least one image to upload');
      return res.redirect(`/view-product/${productCode}/${productId}/upload-images`);
    }

    const fileNames = uploadedFiles.map(file => file.filename);
    const sql = 'INSERT INTO images (product_id, image_name) VALUES (?, ?)';
  
    db.query(sql, [productId, fileNames]);
  
    req.flash('info', 'Saved');
    res.redirect(`/view-product/${productCode}/${productId}/upload-images`);

  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Database error' });
  }


});


module.exports = router;
