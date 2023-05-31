const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('add-product');
});

router.post('/', (req, res) => {
  
  const { id, productName } = req.body;

  const directory = `../products/${id}`;
  const filePath = `../products/${id}/${id}.html`;

  // Check if the ID and product name is provided
  if (!id || !productName) {
    console.log('no id no prod name')
    return res.status(404).send();
  }

  if (fs.existsSync(directory)) {
    return res.status(400).send();
  }

  // Create the new folder
  fs.mkdir(directory, (err) => {
    const fileContent = '';
    if (err) {
      console.error('Error creating product:', err);
      return res.status(500).send('Error creating product');
    }

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error('Error creating product:', err);
        return res.status(500).send('Error creating product');
      }
      res.send(id);
    });
  });
});

module.exports = router;
