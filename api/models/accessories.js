const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
});

module.exports = mongoose.model('Accessory', accessorySchema);