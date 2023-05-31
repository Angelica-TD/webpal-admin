const express = require('express');
const fs = require('fs-extra');
const router = express.Router();

router.post('/', (req, res) => {
  
  const { id } = req.body;

  const directoryPath = `../products/${id}`;

  // remove directory
  fs.remove(directoryPath, (err) => {

    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting directory' });
    }

    res.send(id);

  });


});

module.exports = router;
