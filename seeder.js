const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('./models/User');
const Event = require('./models/Event');

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();
    console.log('Cleared Users and Events');

    // Hash the default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('secret123', salt);

    // Seed 5 users
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        name: faker.name.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log('Seeded 5 users');

    // Seed 10 events linked to random users
    const events = [];
    for (let i = 0; i < 10; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      events.push({
        title: faker.lorem.words(3),
        location: faker.address.city(),
        date: faker.date.future(),
        description: faker.lorem.sentences(2),
        userId: randomUser._id,
      });
    }
    await Event.insertMany(events);
    console.log('Seeded 10 events');

    await mongoose.connection.close();
    console.log('Seeding complete. Connection closed.');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
