import mongoose from 'mongoose';
import App from '../database/models/Apps.js';
import 'dotenv/config';

// Connect to the database.

const appsToSeed = [
  {
    name: 'App 1',
    description: 'This is the first app',
    version: '1.0.0',
  },
  {
    name: 'App 2',
    description: 'This is the second app',
    version: '2.0.0',
  },
  {
    name: 'App 3',
    description: 'This is the third app',
    version: '3.0.0',
  },
];

// Seed the database with the apps.
async function seedApps() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    await App.deleteMany({});
    await App.insertMany(appsToSeed);
    console.log('Apps seeded successfully');
  }
  catch (error) {
    console.error('Error seeding apps:', error);
  }
  finally {
    mongoose.connection.close();
  }
}

seedApps();
