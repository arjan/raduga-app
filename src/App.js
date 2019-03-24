import React, { Component } from 'react';
import { ViewPager, Frame, Track, View } from 'react-view-pager'

import GlobeScreen from './GlobeScreen'
import AboutScreen from './AboutScreen'

class App extends Component {
  render() {
    return (
      <ViewPager tag="main">
        <Frame className="main-frame">
          <Track
            ref={c => this.track = c}
            viewsToShow={1}
            currentView={1}
            className="track"
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
      </ViewPager>
    );
  }
}

export default App;
