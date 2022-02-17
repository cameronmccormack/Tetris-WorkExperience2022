import mongoose from 'mongoose';

export const UserModel = mongoose.model('Users', UserSchema, 'Users');