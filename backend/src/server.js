/*
    Import packages
 */

import Hapi from 'hapi';
import Path from 'path';

/*
    Bootstrap
 */

const server = new Hapi.Server();

// set default server
server.connection({
  host: '127.0.0.1',
  port: 2000,
  routes: {
    cors: true,
  },
});

// log incoming request's payload
server.on('tail', (request) => {
  server.log(['request'], request.payload);
});

/*
    Registering routes
 */

// serve client application & uploads
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, 'client'),
      listing: true,
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

  server.log(['info'], `Server has started at: ${server.info.uri}`);
});
