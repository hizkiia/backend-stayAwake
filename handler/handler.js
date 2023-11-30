const Login = require('../model/model')
const express = require('express')
const route = express.Router()
// Endpoint untuk membuat akun baru
const register =  async (req, res) => {
  try {
    const { nama, nomorHp, password } = req.body;
    const newLogin = new Login({ nama, nomorHp, password });
    await newLogin.save();
    res.status(201).json({ message: 'Akun berhasil dibuat' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};