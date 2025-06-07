const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 12);

  await User.create([
    {
      name: 'Alice Doe',
      email: 'alice@example.com',
      password: hashedPassword,
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: hashedPassword,
    },
  ]);

  console.log('Users seeded');
  process.exit();
};

seedUsers();
