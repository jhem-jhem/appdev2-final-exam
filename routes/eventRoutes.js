const express = require('express');
const {
  getAllEvents,
  createEvent,
  getMyEvents,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/events', getAllEvents);         // Public
router.post('/events', protect, createEvent); // Private
router.get('/my-events', protect, getMyEvents); // Private

module.exports = router;
