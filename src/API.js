import Config from './Config'

function qs(params) {
  if (!Object.keys(params).length) return ''
  return '?' + Object.keys(params).map(k => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
  }).join('&')
}

function json(path, args) {
  return fetch(Config.BASE_URL + path + qs(args || {})).then(r => r.json())
}

var jsonGetter = function(path) {
  return function(args) {
    return json(path, args)
  }
}

const blacklist = 'blacklist' in localStorage ? JSON.parse(localStorage.blacklist) : []

const API = {
  getRainbowCities: jsonGetter('app/rainbow-cities'),
  getClosestCities: jsonGetter('app/closest-cities'),
  getCloudsURL: function() {
    return Config.BASE_URL + "latest/clouds.png";
  },
  getRainbowPhotos: async() => {
    const { photos } = await json('/app/photos')
    console.log('photos', photos)
    console.log('blacklist', blacklist)

    return photos.filter(p => blacklist.indexOf(p.id) == -1)
  },
  photoBlacklist: id => {
    blacklist.push(id)
    localStorage.blacklist = JSON.stringify(blacklist)
  }
}
export default API
