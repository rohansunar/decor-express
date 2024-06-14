import { configDotenv } from 'dotenv';
import { Server } from '../index';
import http from 'http';
import debug from 'debug';
import { Application } from 'express';
configDotenv();

// Load controllers
import './RootController';
import './PostController';

export default function app(): Application {
    // Express Setup
    return Server.create({
        views: 'views',
        public: 'public'
    });
}

// Run server
const server = http.createServer(app());
server.listen(process.env.SERVER_PORT);
server.on('error', function (err) {
    console.log(err);
    process.exit(1);
});
server.on('listening', function () {
    console.log(server.address());
    debug('boilerplate:server')('Listening');
});

export function close() {
    server.close();
}
