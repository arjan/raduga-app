import moment from 'moment'

const holidays = [
  [ "01-12", "World AIDS Day (December 1st)" ],
  [ "20-11", "Transgender Day of Remembrance (November 20TH)"],
  [ "26-10", "Intersex Awareness Day (October 26)"],
  [ "17-10", "Spirit Day (October 17th)"],
  [ "11-10", "National Coming Out Day (October 11th)"],
  [ "23-09", "Celebrate Bisexuality Day (September 23rd)"],
  [ "16-07", "International Drag Day (July 16th)"],
  [ "27-06", "Stonewall Riots Anniversary (June 27th)"],
  [ "22-05", "Harvey Milk Day (May 22nd)"],
  [ "17-05", "International Day Against Homophobia and Transphobia (May 17th)"],
  [ "17-04", "Day of Silence (April 17th)"],
  [ "31-03", "International Transgender Day of Visibility (March 31st)"],
  [ "07-02", "National Black HIV/AIDS Awareness Day (February 7th)"],
]

export function isHoliday() {
  const dt = moment().format('DD-MM')

  let result = holidays.reduce((result, [ d, desc ]) => {
    if (!result && d === dt) {
      return desc
    }
    return result
  }, null)

  return result
}
