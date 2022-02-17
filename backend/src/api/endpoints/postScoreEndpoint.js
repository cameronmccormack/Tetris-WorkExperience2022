import mongoose from 'mongoose';

export const postScoreEndpoint = (req) => {
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

    // erroneous line overwrites an already compiled model
    let ScoresModel = mongoose.model('Scores', ScoringSchema, 'Scores');
    // module.exports =
    //     mongoose.models.Scores || mongoose.model('')

    let request = JSON.parse(JSON.stringify(req));
    
    let uid = "";
    let user = "";
    if (request.loggedIn) {
        user = "anon"; 
        uid = Math.round(Math.random() * 10000000);
    } else {
        user = request.user;
        uid = request.uid;
    }

    let data = {
        "uid" : uid,
        "user": user,
        "score": request.score,
        "time": request.timeString,
        "date": Date.now()
    }

    const newDoc = ScoresModel.create(data);

    return {
        message: "doc created",
        doc : newDoc
    }
}