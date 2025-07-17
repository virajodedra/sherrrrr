const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required : true
    },
    picture:{
        type:String,
        required : true
    },
    google_id:{
        type:String,
        required : true
    }, 
  }
);

module.exports = mongoose.model("google_logins",userSchema);