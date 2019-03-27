const mongoose = require('mongoose');

const {PORT,DB,HOST}= process.env.MongoDB;

mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`, {useNewUrlParser: true});

module.exports = mongoose;