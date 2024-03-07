const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = Schema({
name: {
    type: String,
    require: true
},
email: {
    type: String,
    require: true,
    unique:true
},
password: {
    type: String,
    require: true
},
date: {
    type: Date,
    default: Date.now
},
  });
  const User =  mongoose.model('user', userSchema);
//   User.createIndexes();                 not needed we are implementing on auth.js file
  module.exports = User;