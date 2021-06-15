module.exports = {
    DIR: __dirname,
    ServerPort: 5000,
    DBCONNECT: "mongodb://localhost:27017/carepeople",

    "BASEURL" : __dirname+"/uploads/",
    "ADMINPASSMETHOD" : "admin",
    "session" : {
        expiretime : 1000 * 60 * 60
    }
}