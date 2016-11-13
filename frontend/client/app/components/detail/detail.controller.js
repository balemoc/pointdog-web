class DetailController {
  constructor($scope, $state, $stateParams, UserService, PointdogService, AuthService) {
    'ngInject';

    const username = $stateParams.username;
    // get pointdogname from /me/{username}/{pointdogname} path
    // and if it was not specificed, set 'default'
    const pointdogName = $stateParams.pointdogName === '' ? 'default' : $stateParams.pointdogName;

    this.isAuthenticated = AuthService.authenticated;
    const dataToAuthenticate = AuthService.dataToAuthenticate;

    // carousel
    this.images = [];
    // map urls
    this.mapUrls = {
      google: '',
      apple: '',
      tomtom: '',
      waze: '',
      streetview: '',
    };

    // data pipeline
    UserService
      // return user promsie
      .getByName(username)
      // bind user & get avatar
      .then((user) => {
        // validate user
        if (!user.uid) {
          return Promise.reject({
            code: 0,
            data: user,
          });
        }
        this.user = user;
        return UserService.getAvatarUrl(user.avatarImageRef);
      })
      .then((avatarUrl) => {
        this.avatarUrl = avatarUrl;
        // return pointdog
        return PointdogService.getByUId(this.user.uid, pointdogName);
      })
      // set map urls
      .then((pointdog) => {
        // validating pointdog
        if (!pointdog.key) {
          return Promise.reject({
            code: 1,
            data: pointdog,
          });
        }
        // set default (desktop) URL-s
        const {
          lat,
          lng,
        } = pointdog.location;

        // round with lodash
        const latitude = window._.round(lat, 6);
        const longitude = window._.round(lng, 6);

        // def urls
        this.mapUrls.google = `http://maps.google.com/maps?q=${latitude},${longitude}`;
        this.mapUrls.apple = `http://maps.apple.com/?q=${latitude},${longitude}`;
        this.mapUrls.waze = `https://www.waze.com/livemap?zoom=14&lat=${latitude}&lon=${longitude}`;
        this.mapUrls.streetview = `https://www.instantstreetview.com/@${latitude},${longitude},18z,1t`;
        this.mapUrls.tomtom = `tomtomhome://geo:action=navigateto&lat=${latitude}&long=${longitude}&name=${pointdog.name}`;
        this.mapUrls.here = `https://wego.here.com/?map=${latitude},${longitude},18,normal`;

        // set url schemes if mobile
        if (window.navigator.userAgent.match(/iPhone|iPod/)) {
          this.mapUrls.waze = `waze://?ll=${latitude},${longitude}&t=m`;
          this.mapUrls.streetview = `comgooglemaps://?center=${latitude},${longitude}&mapmode=streetview`;
          this.mapUrls.here = `here-location://${latitude},${longitude}`;
        }

        return pointdog;
      })
      // bind pointdog & get images
      .then((pointdog) => {
        this.pointdog = pointdog;

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
      // authenticate validiation
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
      // data validation / db error
      .catch((error) => {
        switch (error.code) {
        case 0:
          $state.go('notfound');
          break;
        case 1:
          $state.go('notfound');
          break;
        default:
          // unhandled
          $state.go('index');
        }
      });
  }
}

export default DetailController;
