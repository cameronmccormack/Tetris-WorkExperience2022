import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { apiRouter } from './api/apiRouter.js';
import * as Realm from "realm-web";
// import  mysql  from 'mysql2';

/*
This is the entry point of our application.
We use a library called Express to set up our web server.
*/

// Create the app
const app = express();

// Set the port we use to receive incoming web traffic.
// On the live server, Heroku sets the port in an environment variable.
// For development, we use port 3000.
const port = process.env.PORT || 3000

// Find path of client directory
const getClientDirectory = () => {
    const currentModuleFile = fileURLToPath(import.meta.url)
    const currentModuleDirectory = path.dirname(currentModuleFile)
    return path.join(currentModuleDirectory, '../../frontend/pages')
}

// Find path of static script directory

const getScriptDirectory = () => {
    const currentModuleFile = fileURLToPath(import.meta.url)
    const currentModuleDirectory = path.dirname(currentModuleFile)
    return path.join(currentModuleDirectory, '../../frontend/scripts')
};

// Find path of static styles directory
const getStylesDirectory = () => {
    const currentModuleFile = fileURLToPath(import.meta.url)
    const currentModuleDirectory = path.dirname(currentModuleFile)
    return path.join(currentModuleDirectory, '../../frontend/styles')
}

// Find path of static images directory
const getImageDirectory = () => {
    const currentModuleFile = fileURLToPath(import.meta.url)
    const currentModuleDirectory = path.dirname(currentModuleFile)
    return path.join(currentModuleDirectory, '../../frontend/images')
}

// All files in the frontend directory available at "<siteurl>/<filename>"
app.use('/', express.static(getClientDirectory(), { extensions: ['html'] }))
app.use('/static/styles/', express.static(getStylesDirectory()))
app.use('/static/scripts/', express.static(getScriptDirectory()))
app.use('/static/images/', express.static(getImageDirectory()))

// API endpoints available at "<siteurl>/api/<endpoint>"
app.use('/api', apiRouter)

// Receive incoming traffic
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

// connect to the db

// const db = mysql.createConnection({
//     host: "127.0.0.1",
//     port:"3306",
//     user: "root",
//     password: "password",
// });

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     db.query("CREATE DATABASE tetris", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });

//     let sql = "CREATE TABLE IF NOT EXISTS scores (user VARCHAR(255), uid VARCHAR(255), score BIGINT(255), time VARCHAR(255))";
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

// // to sort:
// // ALTER TABLE scores ORDER BY score DESC;
// // order table scores by scores (descending)

// db.end();

// username: admin
// password: rbKaWFKXPJuJktzF

const mongoApp = new Realm.App({ id: "tetris-jobsu" });//add realm id here

const credentials = Realm.Credentials.anonymous();

await mongoApp.logIn(credentials);

const mongodb = mongoApp.currentUser.mongoClient("mongodb-atlas");

const bookings = mongodb.db("Tetris").collection("Scores");


/*
// automatically generated mongodb thing
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:<password>@cluster0.ofccz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

i mean its from mongodb so
whatever works though

*/