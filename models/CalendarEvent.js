const { default: mongoose, mongo, Schema } = require('mongoose');

const CalendarEventSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.Mixed,
    required: false,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model(
  'CalendarEvent',
  CalendarEventSchema,
  'calendar'
);
