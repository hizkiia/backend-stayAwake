// Buat file model.js atau sesuaikan dengan kebutuhan Anda
const mongoose = require('../database/db'); // Sesuaikan path sesuai struktur direktori Anda

// Buat schema untuk model login
const loginSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  nomorHp: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Buat model Login berdasarkan schema
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;