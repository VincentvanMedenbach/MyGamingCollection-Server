const mongoose = require('mongoose');

const consoleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
});

module.exports = mongoose.model('Console', consoleSchema);