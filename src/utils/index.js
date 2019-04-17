import Config from '../Config'
import moment from 'moment'

export function photoCity(photo) {
  const meta = JSON.parse(photo.meta)

  var k = 'name_' + Config.getLocale()
  if (k in meta) {
    return meta[k]
  } else if (meta.geocode) {
    for (var i=0; i<meta.geocode.address_components.length; i++) {
      var a = meta.geocode.address_components[i];
      if (a.types[0] === 'locality') {
        return a.long_name
      }
    }
  } else if (meta.name_en) {
    return meta.name_en;
  }
}

export function photoMetadata(photo) {
  const ts = moment(photo.created).format('DD-MM-YYYY HH:mm');
  return `${ts}, ${photoCity(photo)}`
}

export function photoUrl(photo, w) {
  w = w || 400
  return Config.getBaseUrl() + '/photos/' + photo.variants[w+'']
}
