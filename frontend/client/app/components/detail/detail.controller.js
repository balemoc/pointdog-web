import SnazzyInfoWindow from 'snazzy-info-window';

class DetailController {
  constructor($scope, $state, $sce,
    $stateParams, NgMap, UserService, PointdogService, AuthService) {
    'ngInject';

    /*
      Check if user's browsing through mobile or desktop
     */
    var md = new window.MobileDetect(window.navigator.userAgent);  

    this.isMobile = md.mobile();

    $scope.hideOverlay = () => {
      //
      const lightbox = document.querySelector('.app-lightbox');
      const lightboxImg = document.querySelector('.lightbox-image');

      const dropdownList = document.querySelector('.dropdown-list');
      const dropdownArrow = document.querySelector('.dropdown-arrow');

      const state0 = document.querySelector('.dropdown-state-0');
      const state1 = document.querySelector('.dropdown-state-1');

      if (lightboxImg.classList.contains('active')) {
        lightboxImg.classList.toggle('active');
      }

      if (lightbox.classList.contains('active')) {
        lightbox.classList.toggle('active');
      }

      if (dropdownList.classList.contains('expanded')) {
        dropdownList.classList.toggle('expanded');
        dropdownArrow.classList.toggle('flip');
        state0.classList.toggle('hide');
        state1.classList.toggle('active');
      }
    };

    /*
      Lighbox helper
     */
    $scope.enlargePicture = () => {
      const lightbox = document.querySelector('.app-lightbox');
      const lightboxImg = document.querySelector('.lightbox-image');
      const appDropdown = document.querySelector('.app-dropdown');

      lightbox.classList.toggle('active');
      lightboxImg.classList.toggle('active');

      if (appDropdown.style['z-index'] === '2') {
        appDropdown.style['z-index'] = 1;
      }

      // if (lightbox.classList.contains('active')) {
      //   // close dropbox
      //   const dropdownList = document.querySelector('.dropdown-list');
      //   lightbox.addEventListener('click', () => {
      //     dropdownList.classList.toggle('expanded');
      //   });
      // }
    };

    /*
      Dropdown
     */
    $scope.setDropdownState = () => {
      const appDropdown = document.querySelector('.app-dropdown');
      const dropdownList = document.querySelector('.dropdown-list');
      const dropdownArrow = document.querySelector('.dropdown-arrow');
      const lightbox = document.querySelector('.app-lightbox');
      const lightboxImg = document.querySelector('.lightbox-image');

      if (appDropdown.style['z-index'] !== '2') {
        appDropdown.style['z-index'] = 2;
      } else {
        appDropdown.style['z-index'] = 1;
      }

      const state0 = document.querySelector('.dropdown-state-0');
      const state1 = document.querySelector('.dropdown-state-1');

      state0.classList.toggle('hide');
      state1.classList.toggle('active');

      lightbox.classList.toggle('active');

      // if (lightbox.classList.contains('active')) {
      //   lightbox.addEventListener('click', () => {
      //     dropdownList.classList.toggle('expanded');
      //   });
      // }

      dropdownArrow.classList.toggle('flip');

      dropdownList.classList.toggle('expanded');
    };

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

    /*
      Google Maps
     */
    const googleMapsApiKey = 'AIzaSyAJ_RVwmhNq-W4hkKeyjP0eLOwNlMVxKz4';
    // store google map object in controller scope
    this.mapInstance = null;
    this.infoWindowInstance = null;
    // ngMap
    this.googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;

    this.lat = '51.509865';
    this.lng = '-0.118092';

    this.closeAndOpenInfoWindow = () => {
      const infoWindowElement = document.querySelector('div.si-float-wrapper');
      const isHidden = infoWindowElement.style.display === 'none';

      if (isHidden) {
        infoWindowElement.style.display = 'block';
      } else {
        infoWindowElement.style.display = 'none';
      }
    };

    // data pipeline
    Promise
      .all([NgMap.getMap(), UserService.getByName(username)])
      .then(([_map, _user]) => {
        // store map instance & user
        this.mapInstance = _map;

        console.log(this.mapInstance)

        window.google.maps.event.addDomListener(window, 'resize', () => {
          this.mapInstance.setCenter({ lat: parseFloat(this.lat) + 0.0025, lng: this.lng });
        });

        return _user;
      })
      // bind user & get avatar
      .then((user) => {
        console.log(user)
        // validate user
        if (!user.uid) {
          return Promise.reject({
            code: 0,
            data: user,
          });
        }

        console.log(user);
        this.user = user;
        if (user.avatarImageRef !== '') {
          return UserService.getAvatarUrl(user.avatarImageRef);
        }
        return '';
      })
      .then((avatarUrl) => {
        $scope.$apply(() => {
          this.avatarUrl = $sce.trustAsResourceUrl(avatarUrl);
        });
        // return pointdog
        console.log(this.user.uid)
        console.log(pointdogName)
        return PointdogService.getByUId(this.user.uid, pointdogName);
      })
      // set map urls
      .then((pointdog) => {
        // validating pointdog
        console.log(pointdog)
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

        // update corodinates of marker
        $scope.$apply(() => {
          this.lat = latitude;
          this.lng = longitude;
        });

        const marker = this.mapInstance.customMarkers[0];

        this.infoWindowInstance = new SnazzyInfoWindow({
          marker,
          position: 'top',
          offset: {
            top: '-80px',
            left: '25px',
            right: '0px',
          },
          content: document.querySelector('div.si-content-html'),
          showCloseButton: false,
          closeOnMapClick: false,
          pointer: false,
          padding: '8px',
          maxWidth: '100px',
          wrapperClass: 'col-xs-9 col-md-4 col-sm-5 col-lg-3',
          backgroundColor: 'white',
          border: false,
          borderRadius: '0px',
          shadow: false,
          fontColor: 'black',
          fontSize: '15px',
          callbacks: {
            open() {
              const contentParent = document.querySelector('div.si-wrapper-top');
              const contentElement = document.querySelector('div.si-content-wrapper');
              const trapezoid = document.querySelector('div.si-trapezoid-wrapper');
              const contentHtml = document.querySelector('div.si-content-html');

              contentParent.insertBefore(trapezoid, contentElement);

              // as soon as attached to correct place in DOM, display them
              trapezoid.style.display = 'block';
              contentHtml.style.display = 'block';
            },
          },
        });

        /*
          
         */

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

        console.log(this.pointdog)

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
        let imageContainer = [];

        for (let i = 0; i < imageUrls.length; i += 1) {
          imageContainer.push(imageUrls[i]);
        }

        console.log(imageContainer);

        $scope.$apply(() => {
          this.images = imageContainer;
          this.infoWindowInstance.open();
        });
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
          console.log(error);
          $state.go('index');
        }
      });
  }
}

export default DetailController;
