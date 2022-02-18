import { apiMessageSender } from './api/apiMessageSender.js';


$('#signup-form').on('submit', function(e) {
    apiMessageSender.post('/signUp', {
        "user": document.getElementById("username").value,
        "password": document.getElementById("password").value
    });

    setUserCookies(document.getElementById("username").value);
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    return false;
});


function getUserObj() {
    return {
        "user": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };
}

function setUserCookies(value) {
    let date = new Date();
    date.setTime(date.getTime() + (7*24*3600*1000));
    let expires = `; expires=${date.toUTCString()}`;

    document.cookie = `userlogin=${value || ""}${expires}; path=/`;
}

function getUserLogin() {
    let name = "userlogin";
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}
// function postUser() {
//     console.log("posting user");
//     apiMessageSender.post('/signUp', {
//         "user": document.getElementById("username").value,
//         "password": document.getElementById("password").value
//     });

// }
