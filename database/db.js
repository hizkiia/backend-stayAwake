const mongoose = require('mongoose');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const secretmanagerClient = new SecretManagerServiceClient();

// const callAccessSecretVersion = async () => {
//     const request = {
//         name: 'projects/698487513235/secrets/mongodb/versions/1'
//     };

//     const [response] = await secretmanagerClient.accessSecretVersion(request);
//     const secretValue = response.payload.data.toString();
//     return secretValue;
// }

// //tes

// const connectToDatabase = async () => {
//     try {
//         const secretValue = await callAccessSecretVersion();
//         await mongoose.connect(secretValue);
//         console.log('Database Connected');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:stayawake215314011@stayawake.rpumvhv.mongodb.net/?retryWrites=true&w=majority');
        console.log('Database Connected');
    } catch (error) {
        console.log(error.message);
    }
}

connectToDatabase();

module.exports = mongoose;
