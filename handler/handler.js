const Login = require('../model/model')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// Endpoint untuk membuat akun baru
const register = async (req, res) => {
  try {
    const { nama, nomorHp, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newLogin = new Login({ nama, nomorHp, password: hashedPassword });
    await newLogin.save();
    res.status(201).json({ message: 'Akun berhasil dibuat' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

// Endpoint untuk login
const login = async (req, res) => {
  try {
    const { nomorHp, password } = req.body;
    const user = await Login.findOne({ nomorHp });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login berhasil' });
      } else {
        res.status(401).json({ message: 'Nomor HP atau password salah' });
      }
    } else {
      res.status(401).json({ message: 'Nomor HP atau password salah' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};


module.exports = { register, login };