const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent');

router.post('/create', async (req, res) => {
  const calendarEvent = new CalendarEvent(req.body.calendarEvent);
  calendarEvent.save();
  let test = await CalendarEvent.find({});
  console.log(test);
  res.status(201).json(calendarEvent);
});

router.get('/', async (req, res) => {
  const events = await CalendarEvent.find({});
  res.status(201).json(events);
});

router.put('/update/:id', async (req, res) => {
  console.log('ESMU ŠEIT');
  const { id } = req.params;
  const _id = id;
  const update = req.body.calendarEvent;
  console.log(req.body);

  const updatedEvent = await CalendarEvent.findByIdAndUpdate(
    _id,
    { $set: update },
    { new: true, runValidators: true }
  );

  if (!updatedEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }
  console.log('RESPONSE', updatedEvent);
  res.status(200).json(updatedEvent);
});

router.delete('/delete/:id', async (req, res) => {
  console.log('HERE');
  try {
    const { id } = req.params;
    const deletedEvent = await CalendarEvent.findByIdAndDelete(id);
    console.log('DELETING');
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res
      .status(200)
      .json({ message: 'Event succesfully deleted', deletedEvent });
  } catch (error) {
    console.log('INTERNAL ERROR', error.message);
    res
      .status(500)
      .json({ message: 'Error deleting event', error: error.message });
  }
});

module.exports = router;
