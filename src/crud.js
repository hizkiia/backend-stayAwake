const Login = require('./model')
const express = require('express')
const route = express.Router()
// Endpoint untuk membuat akun baru
route.post('/register', async (req, res) => {
  try {
    const { nama, nomorHp, password } = req.body;
    const newLogin = new Login({ nama, nomorHp, password });
    await newLogin.save();
    res.status(201).json({ message: 'Akun berhasil dibuat' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// Endpoint untuk login
route.post('/login', async (req, res) => {
  try {
    const { nomorHp, password } = req.body;
    const user = await Login.findOne({ nomorHp, password });
    if (user) {
      res.status(200).json({ message: 'Login berhasil' });
    } else {
      res.status(401).json({ message: 'Nomor HP atau password salah' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});
module.exports = route;