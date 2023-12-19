# backend-stayAwake
# Description

- We use Express.js to create this API endpoints as backend
- For deployment we are using App Engine service by Google Cloud Platform
- For database we are using MongoDB Atlas
- For storing images we use Google Cloud Storage
- For auto deployment we use Cloud Build by Google Cloud Platform, and setup cloudbuild.yaml before doing that

# How to run the API locally

1. Clone the repository
2. npm install
3. Comment all callAccessSecretVersion function
4. Create .env file
5. Install and configure MongoDB to your machine
6. For mongodb.js change the secretValue variable into process.env.MONGO_DB
7. For handler.js change all the callAccessSecretVersion() into process.env.KEY
8. For auth.js change the callAccessSecretVersion() into process.env.KEY
9. npm run start-dev

# Example of .env file
```
KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MONGO_DB = mongodb://localhost:27017/
```

# How to run the API on Google Cloud Platform
1. Set up APP Engine
2. Set up MongoDB Atlas
3. Store Secret Key in Secret Manager [KEY, MONGO_DB]
4. Example value for KEY is  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx and example value for MONGO_DB is mongodb+srv://username:password@xxxxxxxxxxxx.mongodb.net/
5. Clone Repo in GCP IDE
6. Change All Configuration for GCP [Project_ID, Secret_Path]
7. Deploy it

# Endpoints

## Register User

- Method: POST
- Path URL: /registerUser
- Header: -
- Body:
    - nama: string
    - tempatLahir: string
    - tanggalLahir: date(YYYY-MM-DD)
    - golDarah: string
    - jenisKelamin: string
    - pekerjaan: string
    - alamat: string
    - noTelepon: string
    - email: string(email)
    - password: string
    - kodeReferral: string(non-required)
      
- Authorization: -
- Response (example):

```json
{"message":"Akun pengguna berhasil dibuat"}
```
## Register Company

- Method: POST
- Path URL: /registerCompany
- Header: -
- Body:
    - namaCompany: string
    - bidangCompany: string
    - email: string
    - password: string
      
- Authorization: -
- Response (example):

```json
{
    "message": "Akun perusahaan berhasil dibuat"
}
```

## Login
- Method: POST
- Path URL: /login
- Header: -
- Body:
    - email: string
    - password: string
- Authorization: -
- Response (example):

```json
{
    "message": "Login sebagai pengguna berhasil",
    "data": {
        "id": "ObjectID",
        "name": "string",
        "token": "string"
    }
}
```
```json
{
    "message": "Login sebagai perusahaan berhasil",
    "data": {
        "id": "ObjectID",
        "name": "string",
        "token": "string"
    }
}
```

## Get User by Referral

- Method: GET
- Path URL: /getUser/:kodeReferral
- Header: -
- Body: -
- Authorization: Bearer Token
- Response (example):

```json
{
    "message": "Data pengguna ditemukan",
    "usersData": {
        "id": "ObjectID",
        "nama": "string",
    	"tempatLahir": "string",
	    "tanggalLahir": "date",
    	"golDarah": "string",
    	"jenisKelamin": "string",
    	"pekerjaan": "string",
    	"alamat": "string",
    	"noTelepon": "string",
    	"email": "string",
    	"kodeReferral": "string",
    },
}
```

## Get User by Email

- Method: GET
- Path URL: /getAccount?email=email
- Header: -
- Body: -
- Authorization: Bearer Token
- Response (example):

```json
{
    "message": "Data pengguna ditemukan",
    "data": {
        "id": "ObjectID",
        "name": "string",
    	"tempatLahir": "string",
	    "tanggalLahir": "date",
    	"golDarah": "string",
    	"jenisKelamin": "string",
    	"pekerjaan": "string",
    	"alamat": "string",
    	"noTelepon": "string",
    	"email": "string",
    	"kodeReferral": "string"
    },
}
```

