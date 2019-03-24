import React from 'react'

import DynamicBackground from './DynamicBackground'
import Globe from './Globe'

export default class extends React.Component {
  render() {
    return (
      <div className="screen--wrapper globe">
        <DynamicBackground />
        <Globe />
      </div>
    )
  }
}
