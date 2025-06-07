const Event = require('../models/Event');

// GET /api/events (public)
exports.getAllEvents = async (req, res) => {
  const events = await Event.find().populate('userId', 'name email');
  res.status(200).json(events);
};

// POST /api/events (private)
exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  const event = await Event.create({
    title,
    location,
    date,
    description,
    userId: req.user._id,
  });

  res.status(201).json(event);
};

// GET /api/my-events (private)
exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user._id });
  res.status(200).json(events);
};
