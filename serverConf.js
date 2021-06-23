module.exports = {
    DIR: __dirname,
    ServerPort: 5000,
    DBCONNECT: process.env.NODE_ENV === "development" ? 
        "mongodb://localhost:27017/carepeople"
         :
        "mongodb://carepeople:j6P3yKPdkCItOjdz@139.177.196.64:27731/carepeople?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256",
}