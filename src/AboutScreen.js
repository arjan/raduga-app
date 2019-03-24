import React from 'react'
import label from './labels'

import DynamicBackground from './DynamicBackground'

export default class extends React.Component {
  render() {
    return (
      <div className="screen--wrapper about">
        <DynamicBackground />
        <div className="about" dangerouslySetInnerHTML={{ __html: label('about') }} />
      </div>
    )
  }
}
