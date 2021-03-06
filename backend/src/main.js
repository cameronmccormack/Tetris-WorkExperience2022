import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { apiRouter } from './api/apiRouter.js';
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