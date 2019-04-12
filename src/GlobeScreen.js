import React from 'react'
import classNames from 'classnames'

import { isHoliday } from './utils/holidays'
import DynamicBackground, { textClass } from './DynamicBackground'
import Globe from './Globe'
import API from './API'
import Config from './Config'
import label from './labels'

function City({ city }) {
  if (!city) return null
  const name = city['name_' + Config.getLocale()] || city.name_en
  if (!name) return null
  return <span className="city">{name}</span>
}

export default class extends React.Component {
  state = {
    cities: [],
    holiday: null,
  }
  componentWillMount() {
    this.setState({ holiday: isHoliday() })

    setInterval(this.pollCities, 100000)
    this.pollCities()
  }

  pollCities = async () => {
    const { cities } = await API.getRainbowCities()
    this.setState({ cities })
  }

  renderCities() {
    const { cities } = this.state
    if (!cities.length) return null

    return (
      <div className="bottom">
        {label('rainbow_predicted_near')}{' '}
        {cities.map((c, i) => <City key={i} city={c} />)}
      </div>
    )
  }

  render() {
    const { holiday } = this.state

    return (
      <div className={classNames("screen--wrapper", "globe", textClass())}>
        <DynamicBackground />
        {holiday && <div className="top">{holiday}</div>}
        {this.renderCities()}
        <Globe />
      </div>
    )
  }
}
