const User = require('../model/UserModel')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Company = require('../model/CompanyModel');

const registerCompany = async (req, res) => {
  try {
    const { namaCompany, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      namaCompany,
      kodeReferral: generateReferralCode(),
      email,
      password: hashedPassword,
    });
    await newCompany.save();
    res.status(201).json({ message: 'Akun perusahaan berhasil dibuat' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { nama, email, password, kodeReferral } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (kodeReferral) {
      const company = await Company.findOne({ kodeReferral });

      if (!company) {
        return res.status(400).json({ message: 'Kode Referral tidak valid' });
      }

      const newUser = new User({
        nama,
        email,
        password: hashedPassword,
        kodeReferral,
      });

      await newUser.save();
      return res.status(201).json({ message: 'Akun pengguna berhasil dibuat dan terhubung dengan perusahaan' });
    } else {
      const newUser = new User({
        nama,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(201).json({ message: 'Akun pengguna berhasil dibuat' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (role === 'company') {
      const company = await Company.findOne({ email });

      if (company) {
        const passwordMatch = await bcrypt.compare(password, company.password);

        if (passwordMatch) {
          res.status(200).json({ message: 'Login sebagai perusahaan berhasil' });
        } else {
          res.status(401).json({ message: 'Email atau password salah untuk perusahaan' });
        }
      } else {
        res.status(401).json({ message: 'Email atau password salah untuk perusahaan' });
      }
    } else if (role === 'user') {
      const user = await User.findOne({ email });

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          res.status(200).json({ message: 'Login sebagai pengguna berhasil' });
        } else {
          res.status(401).json({ message: 'Email atau password salah untuk pengguna' });
        }
      } else {
        res.status(401).json({ message: 'Email atau password salah untuk pengguna' });
      }
    } else {
      res.status(400).json({ message: 'Role tidak valid' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

const getUserbyReferral = async (req, res) => {
  try {
    const { kodeReferral } = req.body; // Gantilah ini dengan cara Anda mendapatkan kodeReferral

    // Pastikan perusahaan yang sedang login memiliki kodeReferral yang sesuai
    const company = await Company.findOne({ kodeReferral });

    if (!company) {
      return res.status(400).json({ message: 'Perusahaan tidak ditemukan atau tidak memiliki hak akses' });
    }

    // Gunakan metode pada model Company untuk mendapatkan pengguna dengan kode referral tertentu
    const users = await company.getUsersByReferral();

    res.status(200).json({ message: 'Data pengguna ditemukan', users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

function generateReferralCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let referralCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCode += characters.charAt(randomIndex);
  }

  return referralCode;
}

module.exports = { registerCompany, registerUser, login, getUserbyReferral };