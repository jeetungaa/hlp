const admin = require("firebase-admin");

if(!admin.app.length){
    admin.initializeApp({
        credential : admin.credential.applicationDefault(),
    });
}

module.exports = admin;