import React from 'react'

import DynamicBackground from './DynamicBackground'
import Globe from './Globe'
import API from './API'
import Config from './Config'
import label from './labels'

function City({ city }) {
  if (!city) return null
  return city['name_' + Config.getLocale()] || city.name_en || null
}

export default class extends React.Component {
  state = {
    cities: []
  }
  componentWillMount() {
    setInterval(this.pollCities, 1000)
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
      <div className="cities">
        {label('rainbow_predicted_near')}
        {cities.map((c, i) => <City key={i} city={c} />)}
      </div>
    )
  }

  render() {
    return (
      <div className="screen--wrapper globe">
        <DynamicBackground />
        {this.renderCities()}
        <Globe />
      </div>
    )
  }
}
