import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = uri.split('/').pop().split('?')[0];

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema, 'users');

async function updateProfilePhotos() {
  await mongoose.connect(uri, { dbName });
  const users = await User.find();
  for (const user of users) {
    let url = '';
    if (user.gender === 'male') {
      url = `https://api.dicebear.com/7.x/adventurer/png?seed=${encodeURIComponent(user.username)}&backgroundColor=e0e7ff`;
    } else if (user.gender === 'female') {
      url = `https://api.dicebear.com/7.x/adventurer/png?seed=${encodeURIComponent(user.username)}&backgroundColor=e6e6fa`;
    } else {
      url = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=90cdf4&color=fff&rounded=true`;
    }
    await User.updateOne({ _id: user._id }, { $set: { profilePhoto: url } });
  }
  console.log('All user profile photos updated!');
  mongoose.disconnect();
}

updateProfilePhotos();
