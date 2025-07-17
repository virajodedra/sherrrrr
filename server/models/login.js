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
    password: {
        type: String,
        required: true,
    },
  }
);

module.exports = mongoose.model("logins",userSchema);