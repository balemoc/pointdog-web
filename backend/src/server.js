/*
    Import packages
 */

import Hapi from 'hapi';

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

server.route({
  path: '/api/pin',
  method: 'POST',
  handler: (request, response) => {
    response('ok');
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
