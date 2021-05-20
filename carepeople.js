const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require("http").Server(app);

const config = require('./serverConf');
const adminRouter = require("./router");

app.use(cors());
app.use(express.static('./client'));
app.use(express.static('./uploads'));
app.use(bodyParser.json({
	limit: "15360mb",
	type: 'application/json'
}));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/admin', (req, res, next) => {
	adminRouter(req, res, next);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(config.DIR, 'client/index.html'));
});
server.listen(config.ServerPort, () => {
	console.log(`Started server on => http://localhost:${config.ServerPort}`);
});