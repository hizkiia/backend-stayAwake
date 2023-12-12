const mongoose = require('../database/db');

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  tempatLahir: {
    type: String,
    required: true
  },
  tanggalLahir: {
    type: Date,
    required: true
  },
  golDarah: {
    type: String,
    required: false
  },
  jenisKelamin: {
    type: String,
    required: true
  },
  pekerjaan: {
    type: String,
    required: false
  },
  alamat: {
    type: String,
    required: true
  },
  noTelepon: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  kodeReferral: {
    type: String,
    required: false
  },
});

userSchema.statics.getUsersByReferral = async function (kodeReferral) {
  return this.find({ kodeReferral });
};

const User = mongoose.model('User', userSchema);

module.exports = User;