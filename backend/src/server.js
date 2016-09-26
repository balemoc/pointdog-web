/*
    Import packages
 */

import Hapi from 'hapi';
import Path from 'path';
import Inert from 'inert';
import ResponseDecorator from 'hapi-boom-decorators';

/*
    Bootstrap
 */

const server = new Hapi.Server();

// set default server
server.connection({
  host: '127.0.0.1',
  port: 2500,
  routes: {
    cors: true,
  },
});

// directory handler plugin
server.register(Inert, (error) => {
  if (error) {
    console.log(error);
  }
});

// hapi decorator
server.register(ResponseDecorator, (error) => {
  if (error) {
    console.log(error);
  }
});

// log incoming request's payload
server.on('tail', (request) => {
  console.log(request.payload);
});

/*
    Registering routes
 */

// serve client application & uploads
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    file: Path.join(__dirname, 'client/index.html'),
  },
});

server.route({
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, 'client/public'),
    },
  },
});

// pin
server.route({
  path: '/api/pin',
  method: 'POST',
  handler: (request, response) => {
    if (!request.payload.pin_code) {
      response.badRequest('Invalid body');
    }
  },
});

/*
    Start server
 */

server.start((error) => {
  if (error) {
    throw error;
  }

  console.log(`Server has started at: ${server.info.uri}`);
});
