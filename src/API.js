import Config from './Config'

function qs(params) {
  if (!Object.keys(params).length) return ''
  return '?' + Object.keys(params).map(k => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
  }).join('&')
}

var jsonGetter = function(path) {
  return function(args) {
    return fetch(Config.BASE_URL + path + qs(args || {})).then(r => r.json())
  }
}

const API = {
  getRainbowCities: jsonGetter('app/rainbow-cities'),
  getClosestCities: jsonGetter('app/closest-cities'),
  getCloudsURL: function() {
    return Config.BASE_URL + "latest/clouds.png";
  },
  getRainbowPhotos: jsonGetter('/app/photos'),
}
export default API
