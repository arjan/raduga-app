import React, { Component } from 'react';
import classNames from 'classnames'
import { ViewPager, Frame, Track, View } from 'react-view-pager'

import GlobeScreen from './GlobeScreen'
import AboutScreen from './AboutScreen'

class App extends Component {
  state = {
    selectedView: 1
  }
  onViewChange = ([ selectedView ]) => {
    this.setState({ selectedView })
  }

  render() {
    const { selectedView } = this.state

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
            <View className="view">1</View>
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
      </ViewPager>
    );
  }
}

export default App;
