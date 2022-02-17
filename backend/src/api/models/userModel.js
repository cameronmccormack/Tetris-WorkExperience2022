import mongoose from 'mongoose';

//Set up default mongoose connection
const mongoDB = 'mongodb+srv://admin:Tetris123@cluster0.ofccz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    uid: String,
    user: String,
    password: String,
});

export const UserModel = mongoose.model('Users', UserSchema, 'Users');