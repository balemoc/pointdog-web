class AuthController {
  constructor($state, AuthService) {
    'ngInject';

    const {
      username,
      pointdogName,
      hash,
    } = AuthService.dataToAuthenticate;

    this.pinCode = '';

    this.checkAuth = () => {
      // param check
      if (this.pinCode === '') return false;

      return AuthService.auth(this.pinCode, hash)
        .then(() => {
          AuthService.authenticated = true;
          $state.go('detail', {
            username,
            pointdogName,
          });
        })
        .catch((error) => {
          AuthService.authenticated = false;
        });
    };
  }
}

export default AuthController;
