import express from 'express';
import path from "path";
import bodyParser from 'body-parser';
import cors from 'cors';
import http from "http";
import mongoose from 'mongoose'
import socketIo from "socket.io"
import morgan from 'morgan'
import { createStream } from 'rotating-file-stream'

import config from '../serverConf';
import apiRouter from "./router";
import SocketServer from "./socket"

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const accessLogStream = createStream('access.log', { interval: '1d', path: path.join(config.DIR, 'log') })

mongoose.connect(config.DBCONNECT, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
	console.log('Database is connected')
}, err => {
	console.log('Can not connect to the database' + err)
})

app.use(cors());
app.use(express.static(path.join(config.DIR, 'client')));
app.use(express.static(path.join(config.DIR, 'uploads')));
app.use(bodyParser.json({ limit: "15360mb", type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: accessLogStream }))
app.set("socketio", io)

SocketServer(io)

app.use('/api', (req, res, next) => { apiRouter(req, res, next); });
app.get('*', (req, res) => { res.sendFile(path.join(config.DIR, 'client/index.html')); });

server.listen(config.ServerPort, () => { console.log(`Started server on => http://localhost:${config.ServerPort}`); });