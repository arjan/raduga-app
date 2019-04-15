import React from 'react'
import moment from 'moment'
import Config from './Config'
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import ShareIcon from '@material-ui/icons/Share';

export default class extends React.Component {

  photoUrl(photo, w) {
    w = w || 400
    return Config.getBaseUrl() + '/photos/' + photo.variants[w+'']
  }

  photoCity(meta) {
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

  render() {
    const { photo, onRemove, onFlag } = this.props
    const metadata = JSON.parse(photo.meta)

    const ts = moment(photo.created).format('DD-MM-YYYY HH:mm');

    const description = `${ts}, ${this.photoCity(metadata)}`

    return (
      <div className="photo-item--wrapper">
        <img src={this.photoUrl(photo, 800)} alt={description} />
        <div className="metadata">
          {description}
        </div>
        <div className="controls">
          <DeleteIcon onClick={() => onRemove(photo.id)} />
          <FlagIcon onClick={() => onFlag(photo.id)} />
          <ShareIcon />
        </div>
      </div>
    )
  }
}
