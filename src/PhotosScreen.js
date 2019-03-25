import React from 'react'
import ReactPullToRefresh from 'react-pull-to-refresh'

import API from './API'
import PhotoItem from './PhotoItem'

export default class extends React.Component {
  state = {
    photos: []
  }

  async componentWillMount() {
    const { photos } = await API.getRainbowPhotos()
    this.setState({ photos })
  }

  handleRefresh = async (resolve, _reject) => {
    const { photos } = await API.getRainbowPhotos()
    this.setState({ photos })
    resolve()
  }

  render() {
    const { photos } = this.state

    return (
      <div className="screen--wrapper photos">
        <ReactPullToRefresh onRefresh={this.handleRefresh}>
          {photos.map((p, i) => <PhotoItem key={i} photo={p} />)}
        </ReactPullToRefresh>
      </div>
    )
  }
}
