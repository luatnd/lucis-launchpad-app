import moment from 'moment'

/**
 * convert seconds count to time string in mm:ss
 * @param secs
 */
export function secondsToTimeStr(secs: number): string {
  return secs < 0
    ? ''
    : `${Math.floor(secs / 60)
        .toString()
        .padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`
}

/**
 * Compare date Current date with 2 date (UTC)
 * @param start
 * @param end
 * @returns string
 */
export function compareDate(startTime: string, endTime: string) {
  const currUTC = moment.utc()
  const startUTC = moment.utc(startTime)
  const endUTC = moment.utc(endTime)
  const isBefore = moment.duration(currUTC.diff(startUTC)).asMilliseconds() < 0
  const isAfter = moment.duration(endUTC.diff(currUTC)).asMilliseconds() < 0
  return isBefore ? 'before' : isAfter ? 'after' : 'ontime'
}
