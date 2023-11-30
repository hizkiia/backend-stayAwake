const mongoose = require('../database/db');

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  kodeReferral: {
    type: String,
    required: false,
  },
});

userSchema.statics.getUsersByReferral = async function (kodeReferral) {
  return this.find({ kodeReferral });
};

const User = mongoose.model('User', userSchema);

module.exports = User;