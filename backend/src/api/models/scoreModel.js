import mongoose from 'mongoose';

//Set up default mongoose connection
const mongoDB = 'mongodb+srv://admin:Tetris123@cluster0.ofccz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Schema = mongoose.Schema;

let ScoringSchema = new Schema({
    uid: String,
    user: String,
    score: Number,
    time: String,
    date: { type: Date, default: Date.now() }
});

const ScoreModel = mongoose.model('Scores', ScoringSchema, 'Scores');

export default ScoreModel;