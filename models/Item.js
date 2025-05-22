const { default: mongoose } = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
});

module.exports = mongoose.model('Item', ItemSchema, 'calendar');
