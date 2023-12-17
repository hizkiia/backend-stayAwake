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
7. For authHandler.js line 73 change the callAccessSecretVersion() into process.env.KEY
8. For Auth.js line 41 change the callAccessSecretVersion() into process.env.KEY
9. npm run start-dev

# Example of .env file
```
KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MONGO_DB = mongodb://localhost:27017/
```

# How to run the API on Google Cloud Platform
1. Set up APP Engine
2. Set up MongoDB Atlas
3. Set up Cloud Storage
4. Store Secret Key in Secret Manager [KEY, MONGO_DB, SERVICE_ACCOUNT]
5. Example value for KEY is  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx and example value for MONGO_DB is mongodb+srv://username:password@xxxxxxxxxxxx.mongodb.net/
6. Clone Repo in GCP IDE
7. Change All Configuration for GCP [Project_ID, Bucket_Name, Secret_Path]
8. Deploy it

# Endpoints

## Register

- Method: POST
- Path URL: /api/v1/auth/register
- Header: -
- Body:
    - name: string
    - email: string(email)
    - password: string(min 8 max 20 digit)
    - passwordConfirmation: string(must be the same as password)
- Authorization: -
- Response (example):

```json
{
    "error": false,
    "message": "Akun berhasil dibuat",
    "data": {
        "name": "string",
        "email": "string",
        "password": "string",
        "accountLevel": "integer",
        "accountExp": "integer",
	"completedSubQuiz": "integer",
        "completedQuiz": "integer",
        "createdAt": "date",
        "_id": "ObjectID",
        "imageUrl": "string",
        "__v": "integer"
    }
}
```

## Login
- Method: POST
- Path URL: /api/v1/auth/login
- Header: -
- Body:
    - email: string(email)
    - password: string(min 8 max 20 digit)
- Authorization: -
- Response (example):

```json
{
    "error": false,
    "message": "success",
    "data": {
        "id": "ObjectID",
        "name": "string",
        "token": "string"
    }
}
```

## Get Profile

- Method: GET
- Path URL: /api/v1/account/profile
- Header: -
- Body: -
- Authorization: Bearer Token
- Response (example):

```json
{
    "error": false,
    "message": "success",
    "data": {
        "_id": "ObjectID",
        "name": "string",
        "email": "string",
        "password": "string",
        "accountLevel": "integer",
        "accountExp": "integer",
        "completedQuiz": "integer",
        "createdAt": "date",
        "imageUrl": "string",
        "__v": "integer"
	"completedSubQuiz": "integer",
    }
}
```

