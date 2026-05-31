import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

// Seed the octofit_db database with test data
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(mongoUri);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create users
  const alice = await User.create({ name: 'Alice Johnson', email: 'alice@example.com', passwordHash: 'hash1' });
  const bob = await User.create({ name: 'Bob Lee', email: 'bob@example.com', passwordHash: 'hash2' });
  const carol = await User.create({ name: 'Carol Smith', email: 'carol@example.com', passwordHash: 'hash3' });

  // Create teams
  const teamA = await Team.create({ name: 'Morning Runners', members: [alice._id, bob._id] });
  const teamB = await Team.create({ name: 'Evening Lifters', members: [carol._id] });

  // Create workouts
  const workout1 = await Workout.create({
    title: 'Quick Morning Cardio',
    description: 'A short cardio routine',
    exercises: [
      { name: 'Jogging', durationMinutes: 20, calories: 200 },
      { name: 'Sprints', durationMinutes: 10, calories: 150 },
    ],
  });

  const workout2 = await Workout.create({
    title: 'Strength Circuit',
    description: 'Full body strength workout',
    exercises: [
      { name: 'Push-ups', durationMinutes: 10, calories: 80 },
      { name: 'Squats', durationMinutes: 15, calories: 120 },
    ],
  });

  // Create activities
  await Activity.create({ user: alice._id, type: 'running', durationMinutes: 30, calories: 300, date: new Date() });
  await Activity.create({ user: bob._id, type: 'cycling', durationMinutes: 45, calories: 450, date: new Date() });
  await Activity.create({ user: carol._id, type: 'weights', durationMinutes: 60, calories: 500, date: new Date() });

  // Create leaderboard entries
  await Leaderboard.create({ user: alice._id, score: 1200, rank: 1 });
  await Leaderboard.create({ user: bob._id, score: 900, rank: 2 });
  await Leaderboard.create({ user: carol._id, score: 800, rank: 3 });

  console.log('Seed completed:');
  console.log('Users:', await User.countDocuments());
  console.log('Teams:', await Team.countDocuments());
  console.log('Workouts:', await Workout.countDocuments());
  console.log('Activities:', await Activity.countDocuments());
  console.log('Leaderboard:', await Leaderboard.countDocuments());

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  });
