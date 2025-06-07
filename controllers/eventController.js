const Event = require('../models/Event');
const transporter = require('./config/nodemailer');
const pug = require('pug');
const path = require('path');

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  const event = await Event.create({
    title,
    location,
    date,
    description,
    userId: req.user._id,
  });

  const html = pug.renderFile(
    path.join(__dirname, '../emails/eventCreated.pug'),
    {
      name: req.user.name,
      title,
      date: new Date(date).toLocaleString(),
      location,
    }
  );

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: req.user.email,
    subject: 'Event Created Successfully',
    html,
  });

  res.status(201).json(event);
};
