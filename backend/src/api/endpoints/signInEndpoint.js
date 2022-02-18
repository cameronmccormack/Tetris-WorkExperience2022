import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import { UserModel } from '../models/userModel.js'

export const signInEndpoint = (req) => {
    //Set up default mongoose connection
    const mongoDB = 'mongodb+srv://admin:Tetris123@cluster0.ofccz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

    //Get the default connection
    const db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    let Schema = mongoose.Schema;

    let request = JSON.parse(JSON.stringify(req));

    let hashedPw = CryptoJS.SHA256(request.password).toString(CryptoJS.enc.Hex);
    let message;

    UserModel.countDocuments({user:request.user,password:hashedPw}, function (e, count) {
        if (e) throw e;
        if (count === 0) {
            message = false;
        } else {
            message = true;
        }
    })

    return message;
}