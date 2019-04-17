import React, { Component } from 'react';
import classNames from 'classnames'
import { ViewPager, Frame, Track, View } from 'react-view-pager'
import { initializePush } from './utils/cordova'

import PushDialog from './PushDialog'
import PhotosScreen from './PhotosScreen'
import GlobeScreen from './GlobeScreen'
import AboutScreen from './AboutScreen'

class App extends Component {
  state = {
    selectedView: 1,
    pushMessage: null
  }
  onViewChange = ([ selectedView ]) => {
    this.setState({ selectedView })
  }

  componentDidMount() {
    if (window.cordova) {
      initializePush(pushMessage => this.setState({ pushMessage }))
    }
  }

  render() {
    const { selectedView, pushMessage } = this.state

    return (
      <ViewPager tag="main">
        <Frame className="main-frame">
          <Track
            ref={c => this.track = c}
            viewsToShow={1}
            currentView={selectedView}
            className="track"
            onViewChange={this.onViewChange}

          >
            <View className="view">
              <PhotosScreen />
            </View>
            <View className="view">
              <GlobeScreen />
            </View>
            <View className="view">
              <AboutScreen />
            </View>
          </Track>
        </Frame>
        <div className="nav-dots">
          <span className={classNames({ selected: selectedView === 0 })} />
          <span className={classNames({ selected: selectedView === 1 })} />
          <span className={classNames({ selected: selectedView === 2 })} />
        </div>
        {pushMessage ? <PushDialog message={pushMessage.message} onClose={() => this.setState({ pushMessage: null })} /> : null}
      </ViewPager>
    );
  }
}

export default App;
