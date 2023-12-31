const User = require('../model/userModel')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Company = require('../model/companyModel');
const jwt = require('jsonwebtoken');
const Response = require('../model/Response');


// const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// const secretmanagerClient = new SecretManagerServiceClient();

// const callAccessSecretVersion = async () => {
//   // Construct request
//   const request = {
//     name: 'projects/698487513235/secrets/tokenkey/versions/1'
//   };

//   // Run request
//   const [response] = await secretmanagerClient.accessSecretVersion(request);
//   const secretValue = response.payload.data.toString();
//   return secretValue;
// }

const registerCompany = async (req, res) => {
  try {
    const { namaCompany, bidangCompany, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      namaCompany,
      bidangCompany,
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
    const { nama, tempatLahir, tanggalLahir, golDarah,
      jenisKelamin, pekerjaan, alamat, noTelepon, email, password, kodeReferral } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (kodeReferral) {
      const company = await Company.findOne({ kodeReferral });

      if (!company) {
        return res.status(400).json({ message: 'Kode Referral tidak valid' });
      }

      const newUser = new User({
        nama,
        tempatLahir,
        tanggalLahir,
        golDarah,
        jenisKelamin,
        pekerjaan,
        alamat,
        noTelepon,
        email,
        password: hashedPassword,
        kodeReferral,
      });

      await newUser.save();
      return res.status(201).json({ message: 'Akun pengguna berhasil dibuat dan terhubung dengan perusahaan' });
    } else {
      const newUser = new User({
        nama,
        tempatLahir,
        tanggalLahir,
        golDarah,
        jenisKelamin,
        pekerjaan,
        alamat,
        noTelepon,
        email,
        password: hashedPassword,
        kodeReferral,
        //sidjsjdij
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
    const { email, password } = req.body;

    // Check if the email is registered as a company
    const company = await Company.findOne({ email });

    // Check if the email is registered as a user
    const user = await User.findOne({ email });

    if (company) {
      const passwordMatch = await bcrypt.compare(password, company.password);

      if (passwordMatch) {
        const expiresIn = 3600; // Contoh: token kedaluwarsa dalam 1 jam (3600 detik)
        const createJwtToken = jwt.sign({ id: company._id }, process.env.KEY, { expiresIn });
        const data = {
          id: company._id,
          name: company.namaCompany,
          token: createJwtToken,
        };
        res.status(200).json({ message: 'Login sebagai perusahaan berhasil', data: data });
      } else {
        res.status(401).json({ message: 'Email atau password salah untuk perusahaan' });
      }
    } else if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const expiresIn = 3600; // Contoh: token kedaluwarsa dalam 1 jam (3600 detik)
        const createJwtToken = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn });
        const data = {
          id: user._id,
          name: user.nama,
          token: createJwtToken,
        };
        res.status(200).json({ message: 'Login sebagai pengguna berhasil', data: data });
      } else {
        res.status(401).json({ message: 'Email atau password salah untuk pengguna' });
      }
    } else {
      res.status(401).json({ message: 'Email tidak terdaftar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

const getUserbyReferral = async (req, res) => {
  try {
    const kodeReferral = req.params.kodeReferral; // Gantilah ini dengan cara Anda mendapatkan kodeReferral
    console.log(kodeReferral);
    // Pastikan perusahaan yang sedang login memiliki kodeReferral yang sesuai
    const company = await Company.findOne({ kodeReferral });

    if (!company) {
      return res.status(400).json({ message: 'Perusahaan tidak ditemukan atau tidak memiliki hak akses' });
    }

    // Gunakan metode pada model Company untuk mendapatkan pengguna dengan kode referral tertentu
    const users = await company.getUsersByReferral();
    const userData = users.map(user => ({
      id: user._id,
      name: user.nama,
      tempatLahir: user.tempatLahir,
      tanggalLahir: user.tanggalLahir,
      golDarah: user.golDarah,
      jenisKelamin: user.jenisKelamin,
      pekerjaan: user.pekerjaan,
      alamat: user.alamat,
      noTelepon: user.noTelepon,
      email: user.email,
      kodeReferral: user.kodeReferral,
    }));

    res.status(200).json({ message: 'Data pengguna ditemukan', userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

const getAccount = async (req, res) => {
  const account = req.currentUser;
  const response = new Response.Success(false, 'success', account);
  res.json(response);
};

const getAllAccount = async (req, res) => {
  try {
    // Retrieve all users
    const users = await User.find();

    // Retrieve all companies
    const companies = await Company.find();

    // Combine user and company data
    const allAccounts = {
      users: users.map(user => ({
        id: user._id,
        name: user.nama,
        tempatLahir: user.tempatLahir,
        tanggalLahir: user.tanggalLahir,
        golDarah: user.golDarah,
        jenisKelamin: user.jenisKelamin,
        pekerjaan: user.pekerjaan,
        alamat: user.alamat,
        noTelepon: user.noTelepon,
        email: user.email,
        kodeReferral: user.kodeReferral
      })),
      companies: companies.map(company => ({
        id: company._id,
        name: company.namaCompany,
        bidangCompany: company.bidangCompany,
        kodeReferral: company.kodeReferral,
        email: company.email
      })),
    };

    res.status(200).json({ message: 'Data semua akun berhasil ditemukan', data: allAccounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

const getAccountByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const users = await User.find({ email });

    if (users.length === 0) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    const userData = users.map(user => ({
      id: user._id,
      name: user.nama,
      tempatLahir: user.tempatLahir,
      tanggalLahir: user.tanggalLahir,
      golDarah: user.golDarah,
      jenisKelamin: user.jenisKelamin,
      pekerjaan: user.pekerjaan,
      alamat: user.alamat,
      noTelepon: user.noTelepon,
      email: user.email,
      kodeReferral: user.kodeReferral,
    }));

    res.status(200).json({ message: 'Data pengguna ditemukan', data: userData });
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

module.exports = { registerCompany, registerUser, login, getUserbyReferral, getAccount, getAllAccount, getAccountByEmail };