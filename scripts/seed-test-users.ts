// Run this script to seed test users directly in the database
// Usage: npx tsx scripts/seed-test-users.ts

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://umangjit1987_db_user:nplCvy8A7jSwSiW1@cluster0.aknzayv.mongodb.net/RYDER';

interface TestUser {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}

const testUsers: TestUser[] = [
  {
    name: 'Test User 1',
    email: 'testuser1@example.com',
    password: 'test123',
    isEmailVerified: true
  },
  {
    name: 'Test User 2',
    email: 'testuser2@example.com',
    password: 'test123',
    isEmailVerified: true
  },
  {
    name: 'Test User 3',
    email: 'testuser3@example.com',
    password: 'test123',
    isEmailVerified: true
  },
  {
    name: 'Demo Partner',
    email: 'partner@example.com',
    password: 'partner123',
    isEmailVerified: true
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isEmailVerified: true
  }
];

async function seedTestUsers() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URL);
    console.log('Connected successfully!');

    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String },
      role: { type: String, enum: ['user', 'partner', 'admin'], default: 'user' },
      isEmailVerified: { type: Boolean, default: false },
      otp: { type: String },
      otpExpiresAt: { type: Date }
    }, { timestamps: true }));

    for (const userData of testUsers) {
      try {
        const existingUser = await User.findOne({ email: userData.email });
        
        if (existingUser) {
          console.log(`⚠️  User already exists: ${userData.email}`);
          continue;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        await User.create({
          ...userData,
          password: hashedPassword,
          role: userData.email.includes('admin') ? 'admin' : 
                userData.email.includes('partner') ? 'partner' : 'user'
        });
        
        console.log(`✅ Created user: ${userData.email} (${userData.name})`);
      } catch (error) {
        console.error(`❌ Failed to create ${userData.email}:`, error);
      }
    }

    console.log('\n🎉 Seeding completed!');
    console.log('\nTest Credentials:');
    testUsers.forEach(user => {
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password}`);
      console.log('---');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

seedTestUsers();
