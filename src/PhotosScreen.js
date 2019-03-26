import React from 'react'
import Fab from '@material-ui/core/Fab';
import PhotoIcon from '@material-ui/icons/AddAPhoto';

import API from './API'
import PhotoItem from './PhotoItem'
import ConfirmRemoveDialog from './ConfirmRemoveDialog'
import TermsDialog from './TermsDialog'
import FlagDrawer from './FlagDrawer'


export default class extends React.Component {
  state = {
    photos: [],
    confirmRemove: null,
    confirmFlag: null,
    terms: null
  }

  async componentWillMount() {
    this.refresh()
  }

  async refresh() {
    const photos = await API.getRainbowPhotos()
    this.setState({ photos })
  }

  confirmRemove = async remove => {
    API.photoBlacklist(this.state.confirmRemove)
    await this.refresh()
    this.setState({ confirmRemove: null })
  }

  confirmFlag = async reason => {
    if (reason) {
      await API.flagPhoto(this.state.confirmFlag, reason)
    }
    this.setState({ confirmFlag: null })
  }

  takePhoto = async () => {
    if (!API.termsAccepted()) {
      this.setState({ terms: true })
      return
    }
    console.log('taking phtoo')
  }

  render() {
    const { photos } = this.state

    return (
      <div className="screen--wrapper photos">
        <div className="scroll">
          {photos.map((p, i) =>
            <PhotoItem
              key={i}
              photo={p}
              onRemove={id => this.setState({ confirmRemove: id })}
              onFlag={id => this.setState({ confirmFlag: id })}
            />
          )}
        </div>
        <Fab className="add" onClick={this.takePhoto} ><PhotoIcon /></Fab>
        {this.state.confirmRemove && <ConfirmRemoveDialog onClose={this.confirmRemove}/>}
        {this.state.confirmFlag && <FlagDrawer onClose={this.confirmFlag}/>}
        {this.state.terms && <TermsDialog onClose={flag => { API.termsAccepted(flag); this.setState({ terms: null }); if (flag) this.takePhoto(); }} />}
      </div>
    )
  }
}
