import React from 'react'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import FlagIcon from '@material-ui/icons/FlagOutlined'
import ShareIcon from '@material-ui/icons/Share'
import { photoMetadata, photoUrl } from './utils'

export default class extends React.Component {

  render() {
    const { photo, onRemove, onFlag } = this.props
    const description = photoMetadata(photo)
    const url = photoUrl(photo, 800)

    return (
      <div className="photo-item--wrapper">
        <img src={url} alt={description} />
        <div className="metadata">
          {description}
        </div>
        <div className="controls">
          <DeleteIcon onClick={() => onRemove(photo.id)} />
          <FlagIcon onClick={() => onFlag(photo.id)} />
          <ShareIcon onClick={() => navigator.share({ url })} />
        </div>
      </div>
    )
  }
}
