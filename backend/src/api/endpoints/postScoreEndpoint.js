import mongoose from 'mongoose';
import ScoreModel from '../models/scoreModel.js';

export const postScoreEndpoint = (req) => {

    let request = JSON.parse(JSON.stringify(req));
    
    let uid = "";
    let user = "";
    if (!request.loggedIn) {
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

    const newDoc = ScoreModel.create(data);

    return {
        message: "doc created",
        doc : newDoc
    }
}