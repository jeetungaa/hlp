const admin = require("firebase-admin");

if(!admin.app.length){
    admin.initializeApp();
}

module.exports = admin;