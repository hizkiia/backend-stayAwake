const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({

    namaCompany: {
        type: String,
        required: true,
    },
    bidangCompany: {
        type: String,
        required: true,
    },
    kodeReferral: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

});
companySchema.methods.getUsersByReferral = async function () {
    const User = require('./userModel');
    return User.getUsersByReferral(this.kodeReferral);
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;