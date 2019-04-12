import React from 'react'
import classNames from 'classnames'
import label from './labels'

import DynamicBackground, { textClass } from './DynamicBackground'

export default class extends React.Component {
  render() {
    return (
      <div className={classNames("screen--wrapper", "about", textClass())}>
        <DynamicBackground />
        <div className="about" dangerouslySetInnerHTML={{ __html: label('about') }} />
      </div>
    )
  }
}
