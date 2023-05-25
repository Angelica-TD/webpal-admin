const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
  const { id } = req.body;

  // Check if the ID is provided
  if (!id) {
    return res.status(400).send('ID is required');
  }

  if (fs.existsSync(`products/${id}`)) {
    return res.status(400).send('Folder already exists');
  }

  // Create the new folder
  fs.mkdir(`../products/${id}`, (err) => {
    const fileContent = '';
    if (err) {
      console.error('Error creating folder:', err);
      return res.status(500).send('Error creating folder');
    }

    fs.writeFile(`../products/${id}/${id}.html`, fileContent, (err) => {
      if (err) {
        console.error('Error creating file:', err);
        return res.status(500).send('Error creating file');
      }
      res.json({ message: 'File created successfully' });
      res.redirect('/');
    });
  });
});

module.exports = router;
