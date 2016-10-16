const AuthFactory = ($http) => {
  'ngInject';

  // services container
  const services = {};

  services.authenticated = null;
  services.dataToAuthenticate = {
    username: null,
    pointdogName: null,
  };

  services.auth = (pinCode, hash) => {
    // param check
    if (!pinCode || !hash) throw new Error('Missing param(s)');

    const data = {
      pinCode,
      hash,
    };

    return $http
      .post('http://localhost:2500/api/auth/pin', data);
  };

  return services;
};

export default AuthFactory;
