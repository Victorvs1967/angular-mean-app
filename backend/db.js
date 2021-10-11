const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanDB')
  .then(() => console.log('DB connection successful'))
  .catch(err => console.log(`Error in connection ${err}`));

module.exports = mongoose;