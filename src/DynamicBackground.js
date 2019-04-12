import React from 'react'
import { isHoliday } from './utils/holidays'

function getHour() {
  return new Date().getHours()
}

export function textClass() {
  return (getHour() > 6) && (getHour() < 23) ? 'text-dark' : 'text-light'
}

export default class extends React.Component {
  state = {
    hour: null,
    kind: 'normal'
  }

  componentDidMount() {
    this.checkHour()
    setInterval(() => this.checkHour(), 10 * 1000)
  }

  checkHour() {
    this.setState({
      kind: !isHoliday() ? 'normal' : 'festive',
      hour: getHour()
    })
  }

  render() {
    const { kind, hour } = this.state

    return (
      <div className="dynamic-background--wrapper" style={{ backgroundImage: `url(images/bg/${kind}_${hour}.jpg)` }} />
    )
  }
}
