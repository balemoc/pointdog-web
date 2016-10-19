class DetailController {
  constructor($scope, $state, $stateParams, UserService, PointdogService, AuthService) {
    'ngInject';

    const username = $stateParams.username;
    // get pointdogname from /{username}/{pointdogname} path
    // and if it was not specificed, set 'default'
    const pointdogName = $stateParams.pointdogName === '' ? 'default' : $stateParams.pointdogName;

    this.isAuthenticated = AuthService.authenticated;
    const dataToAuthenticate = AuthService.dataToAuthenticate;

    this.images = [];

    // data pipeline
    UserService
      // return user promsie
      .getByName(username)
      // bind user & get pointdog
      .then((user) => {
        this.user = user;

        console.log(user);
        // return pointdog promise
        return PointdogService.getByUId(user.uid, pointdogName);
      })
      // bind pointdog & get images
      .then((pointdog) => {
        this.pointdog = pointdog;
        console.log(pointdog)

        // image paths for pointdog
        const {
          mapImageRefPath,
          imageRefPath,
        } = pointdog;

        // array with promises
        const imagesToDownload = [];

        // we check for image
        if (imageRefPath !== '') {
          imagesToDownload.push(PointdogService.getImageUrl(imageRefPath));
        }

        // we check for mapimage
        if (mapImageRefPath !== '') {
          imagesToDownload.push(PointdogService.getImageUrl(mapImageRefPath));
        }

        // resolve when all images downloaded
        // return urls in array
        return Promise.all(imagesToDownload);
      })
      // bind images
      .then((imageUrls) => {
        // we bind all urls to scope (carousel)
        for (let i = 0; i < imageUrls.length; i += 1) {
          this.images.push(imageUrls[i]);
        }
      })
      // authenticate
      .then(() => {
        if (this.user.isPrivate) {
          if (!this.isAuthenticated) {
            // pass username
            dataToAuthenticate.username = username;
            dataToAuthenticate.pointdogName = pointdogName;
            dataToAuthenticate.hash = this.user.PIN;
            return $state.go('auth');
          }
        }
        // there is no need for authentication
        // set it true - messy way
        this.isAuthenticated = true;
      })
      // if user/pointdog is absent or db error occured
      .catch((error) => {
        // todo check what kind of error
        console.log(error);
        //$state.go('index');
      });
  }
}

export default DetailController;
