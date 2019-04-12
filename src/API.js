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

function jsonPost(path, args) {
  return fetch(Config.BASE_URL + path, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  })
}

var jsonGetter = function(path) {
  return function(args) {
    return json(path, args)
  }
}

const blacklist = 'blacklist' in localStorage ? JSON.parse(localStorage.blacklist) : []

const getUserId = () => {
  if (!('userId' in localStorage)) {
    localStorage.userId = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  }
  return localStorage.userId
}

const API = {
  getUserId,
  getRainbowCities: jsonGetter('app/rainbow-cities'),
  getClosestCities: jsonGetter('app/closest-cities'),
  getCloudsURL: function() {
    return Config.BASE_URL + "latest/clouds.png";
  },
  getRainbowPhotos: async() => {
    const { photos } = await json('app/photos')
    return photos.filter(p => blacklist.indexOf(p.id) === -1)
  },
  termsAccepted(flag) {
    if (!flag) return 'termsAccepted' in localStorage
    localStorage.termsAccepted = 'true'
  },
  flagPhoto: async (id, reason) => {
    return jsonPost('app/report/' + id, { reason })
  },
  uploadPhoto: async (photo, meta) => {
    return jsonPost('app/user/' + getUserId() + '/photo', { photo, meta })
  },
  photoBlacklist: id => {
    blacklist.push(id)
    localStorage.blacklist = JSON.stringify(blacklist)
  }
}
export default API
