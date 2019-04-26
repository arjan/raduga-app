const locales = ['en', 'ru', 'zh']

const getLocale = () => {
  const base = (navigator.language || 'en-US').split('-')[0]
  if (locales.indexOf(base) === -1) {
    return 'en'
  }
  return base
}

const Config = {
  getBaseUrl: () => {
    if (getLocale() === 'zh') {
      return 'http://api.rainbow-omg.com/'
    } else {
      return 'http://raduga.miraclethings.nl/'
    }
  },
  getLocale,
  debug: true
}

export default Config
