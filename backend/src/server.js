/*
    Import packages
 */

import Hapi from 'hapi';
import Path from 'path';
import Inert from 'inert';
import ResponseDecorator from 'hapi-boom-decorators';
import joi from 'joi';
import CryptoJS from 'crypto-js';

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
  path: '/api/auth/pin',
  method: 'POST',
  handler: (request, reply) => {
    const {
      pinCode,
      hash,
    } = request.payload;

    const secret = '98CAA88B922AA7096323881A8340DE7B';

    const plainText = CryptoJS.AES.decrypt(hash.toString(), secret).toString(CryptoJS.enc.Utf8);

    if (pinCode !== plainText) {
      return reply.unauthorized();
    }

    return reply();
  },
  config: {
    validate: {
      payload: joi.object().keys({
        pinCode: joi.string().required(),
        hash: joi.string().required(),
      }),
    },
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
