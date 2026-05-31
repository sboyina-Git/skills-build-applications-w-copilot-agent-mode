import mongoose from 'mongoose';

// Database configuration for Octofit Tracker
// Uses local MongoDB by default: mongodb://127.0.0.1:27017/octofit_db

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase() {
  // uses mongoose to connect
  await mongoose.connect(mongoUri);
  return mongoose;
}

export default connectDatabase;
