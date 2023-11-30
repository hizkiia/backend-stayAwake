// const Login = require('../model/model')
// const express = require('express')
// const route = express.Router()
// // Endpoint untuk membuat akun baru
// route.post('/register', async (req, res) => {
//   try {
//     const { nama, nomorHp, password } = req.body;
//     const newLogin = new Login({ nama, nomorHp, password });
//     await newLogin.save();
//     res.status(201).json({ message: 'Akun berhasil dibuat' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Terjadi kesalahan' });
//   }
// });

// // Endpoint untuk login
// route.post('/login', async (req, res) => {
//   try {
//     const { nomorHp, password } = req.body;
//     const user = await Login.findOne({ nomorHp, password });
//     if (user) {
//       res.status(200).json({ message: 'Login berhasil' });
//     } else {
//       res.status(401).json({ message: 'Nomor HP atau password salah' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Terjadi kesalahan' });
//   }
// });

// // Endpoint untuk mengupdate data
// route.put('/update/:id', async (req, res) => {
//   try {
//     const { nama, nomorHp, password } = req.body;
//     const updatedLogin = await Login.findByIdAndUpdate(
//       req.params.id,
//       { nama, nomorHp, password },
//       { new: true }
//     );
//     res.status(200).json({ message: 'Data berhasil diperbarui', updatedLogin });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Terjadi kesalahan' });
//   }
// });

// // Endpoint untuk menghapus data
// route.delete('/delete/:id', async (req, res) => {
//   try {
//     const deletedLogin = await Login.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Data berhasil dihapus', deletedLogin });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Terjadi kesalahan' });
//   }
// });

// module.exports = route;