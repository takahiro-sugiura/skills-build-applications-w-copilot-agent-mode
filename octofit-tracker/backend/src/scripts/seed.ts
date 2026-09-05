import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboardEntry.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya_runner',
        email: 'maya.runner@example.com',
        passwordHash: 'demo-password-hash-1',
        profile: {
          displayName: 'Maya Tanaka',
          fitnessGoal: 'Run a sub-25 minute 5K',
        },
      },
      {
        username: 'leo_lifts',
        email: 'leo.lifts@example.com',
        passwordHash: 'demo-password-hash-2',
        profile: {
          displayName: 'Leo Martinez',
          fitnessGoal: 'Build full-body strength',
        },
      },
      {
        username: 'aisha_flow',
        email: 'aisha.flow@example.com',
        passwordHash: 'demo-password-hash-3',
        profile: {
          displayName: 'Aisha Patel',
          fitnessGoal: 'Improve mobility and recovery',
        },
      },
    ]);

    await Team.create([
      {
        name: 'Morning Momentum',
        description: 'Early risers building consistent cardio and strength habits.',
        memberUserIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Recovery Crew',
        description: 'Mobility, low-impact training, and sustainable weekly streaks.',
        memberUserIds: [users[2]._id],
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        activityType: 'Outdoor run',
        durationMinutes: 42,
        caloriesBurned: 410,
        activityDate: new Date('2026-09-01T06:30:00Z'),
      },
      {
        userId: users[1]._id,
        activityType: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 360,
        activityDate: new Date('2026-09-02T18:15:00Z'),
      },
      {
        userId: users[2]._id,
        activityType: 'Yoga flow',
        durationMinutes: 35,
        caloriesBurned: 160,
        activityDate: new Date('2026-09-03T07:45:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      {
        userId: users[0]._id,
        username: users[0].username,
        points: 1280,
        rank: 1,
      },
      {
        userId: users[1]._id,
        username: users[1].username,
        points: 1165,
        rank: 2,
      },
      {
        userId: users[2]._id,
        username: users[2].username,
        points: 980,
        rank: 3,
      },
    ]);

    await Workout.create([
      {
        name: '5K Tempo Builder',
        description: 'Intervals and tempo work for runners improving race pace.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        targetMuscleGroups: ['legs', 'core', 'cardio'],
      },
      {
        name: 'Foundational Strength Circuit',
        description: 'Compound movements for balanced strength and conditioning.',
        difficulty: 'beginner',
        durationMinutes: 40,
        targetMuscleGroups: ['chest', 'back', 'legs', 'core'],
      },
      {
        name: 'Mobility Reset',
        description: 'Low-impact movement to support flexibility and recovery.',
        difficulty: 'beginner',
        durationMinutes: 25,
        targetMuscleGroups: ['hips', 'shoulders', 'back'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
