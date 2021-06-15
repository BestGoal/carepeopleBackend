module.exports = {
    DIR: __dirname,
    ServerPort: 5000,
    // DBCONNECT: "mongodb://localhost:27017/carepeople",
    DBCONNECT: "mongodb://carepeople:j6P3yKPdkCItOjdz@139.177.196.64:27731/carepeople?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256",

    "BASEURL" : __dirname+"/uploads/",
    "ADMINPASSMETHOD" : "admin",
    "session" : {
        expiretime : 1000 * 60 * 60
    }
}