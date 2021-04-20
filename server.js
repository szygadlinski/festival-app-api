const express = require('express');

const app = express();

app.listen(7000, () => {
  console.log('Server is running on port 7000: http://localhost:7000');
});
