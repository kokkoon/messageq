const express = require('express')
require('dotenv').config()
const app = express();

require('./jobRoutes')(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});