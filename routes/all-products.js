const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  
  const directory = `../products`;

  //Check if folder exists
  if (fs.existsSync(directory)) {
        fs.readdir(directory, (err, files) => {
            if (err){
                return res.status(500).send('Error retrieving directory');
            }

            res.render('all-products', { title: 'All Products', files });

        });
  }

});



module.exports = router;
