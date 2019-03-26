import React from 'react'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import API from './API'
import PhotoItem from './PhotoItem'
import ConfirmRemoveDialog from './ConfirmRemoveDialog'


export default class extends React.Component {
  state = {
    photos: [],
    confirmRemove: null
  }

  async componentWillMount() {
    this.refresh()
  }

  async refresh() {
    const photos = await API.getRainbowPhotos()
    this.setState({ photos })
  }

  onRemove = id => {
    this.setState({ confirmRemove: id })
  }

  confirmRemove = async remove => {
    console.log('this.state.confirmRemove', this.state.confirmRemove)

    API.photoBlacklist(this.state.confirmRemove)
    await this.refresh()
    this.setState({ confirmRemove: null })
  }

  render() {
    const { photos } = this.state

    return (
      <div className="screen--wrapper photos">
        {photos.map((p, i) => <PhotoItem key={i} photo={p} onRemove={id => this.onRemove(id)} />)}
        <Fab className="add"><AddIcon /></Fab>
        {this.state.confirmRemove && <ConfirmRemoveDialog onClose={this.confirmRemove}/>}
      </div>
    )
  }
}
