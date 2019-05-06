import API from '../API'
import Config from '../Config'

export function takePicture() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        navigator.camera.getPicture(
          function ok(data) {
            const fileURL = "data:image/jpeg;base64," + data
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

export function initializePush(onMessage) {
  Pushy.listen();
  Pushy.requestStoragePermission();

  Pushy.register(function (err, deviceToken) {
    // Handle registration errors
    if (err) {
      return alert(err);
    }

    // Display an alert with device token
    // alert('Pushy device token: ' + deviceToken);
    API.setUserId(deviceToken)

    Pushy.subscribe('everybody', console.log)
    if (Config.debug) {
      Pushy.subscribe('debugging', console.log)
    }

    console.log('deviceToken: ' + deviceToken)

    API.getClosestCities().then(cities => {
      // console.log(JSON.stringify(cities))
      cities.map(({ id }) => Pushy.subscribe('city-' + id, console.log))
    })

  });

  // Listen for push notifications
  Pushy.setNotificationListener(function (data) {
    // Print notification payload data
    console.log('Received notification: ' + JSON.stringify(data));
    onMessage(data)
    // Display an alert with the "message" payload value
    // alert(data.message);
  })

}
