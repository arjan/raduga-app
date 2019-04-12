import API from '../API'

export function takePicture() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        navigator.camera.getPicture(
          function ok(data) {
            const fileURL = "data:image/jpeg;base64," + data
            console.log('Got picture: ' + fileURL);
            var meta = {} // $rootScope.closestCity ? $.extend({}, $rootScope.closestCity) : {};
            meta.lat = position.coords.latitude;
            meta.lng = position.coords.longitude;

            API.uploadPhoto(fileURL, meta).then(resolve, reject)
          },
          function fail() {
            reject('Error getting picture')
          },
          {
            quality: 85,
            destinationType: 0,
            targetWidth: 1200,
            targetHeight: 1200,
            correctOrientation: true
          });
      },
      function onError() {
        reject('GPS error')
      },
      {
        timeout: 5000
      }
    )
  })
}
