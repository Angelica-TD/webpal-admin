const app = require('./app');
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
