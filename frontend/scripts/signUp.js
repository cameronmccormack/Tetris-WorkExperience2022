import { apiMessageSender } from './api/apiMessageSender.js';


$('#signup-form').on('submit', function(e) {
    console.log("form submitted");
    apiMessageSender.post('/signUp', {
        "user": document.getElementById("username").value,
        "password": document.getElementById("password").value
    });

    e.preventDefault();
    return false;
});

// function postUser() {
//     console.log("posting user");
//     apiMessageSender.post('/signUp', {
//         "user": document.getElementById("username").value,
//         "password": document.getElementById("password").value
//     });

// }
