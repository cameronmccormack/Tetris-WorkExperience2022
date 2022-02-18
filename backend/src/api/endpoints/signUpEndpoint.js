import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import { UserModel } from '../models/userModel.js'

export const signUpEndpoint = (req) => {
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

    //let UserModel = userModel;

    /*if (!modelAlreadyDeclared('Users')) {
        UserModel = mongoose.model('Users', UserSchema, 'Users');
    } else {
        UserModel = mongoose.models.UserModel;
    }*/

    let request = JSON.parse(JSON.stringify(req));
    
    // generate a unique user ID
    // uses pseudorandom generators instead of specific uuid algorithms
    let uid = Math.round(Math.random() * 10000000);

    UserModel.countDocuments({"uid":uid}, (e, count) => {
        if (count !== 0)
            uid = Math.round(Math.random() * 10000000);
    })

    // ensure username is not taken

    UserModel.countDocuments({"user":request.user}, (e, count) => {
        if (count > 0) {
            return {
                message: "exists"
            }
        }
    })

    let hashedPw = CryptoJS.SHA256(request.password).toString(CryptoJS.enc.Hex);

    let data = {
        "uid" : uid,
        "user": request.user,
        "password": hashedPw
    }

    const newDoc = UserModel.create(data);



    return {
        message: "doc created",
        doc : newDoc
    }
}