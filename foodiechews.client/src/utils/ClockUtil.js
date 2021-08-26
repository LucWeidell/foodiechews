class ClockUtil {
  formatTime() {
    const time = new Date()
    let hour = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    let suffix = 'AM'

    if (hour > 12) {
      hour -= 12
      suffix = 'PM'
    }
    if (hour === 0) {
      hour = 12
      suffix = 'AM'
    }

    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec

    const currentTime = hour + ':' +
    min + ':' + sec + ' ' + suffix

    document.getElementById('clock')
      .innerHTML = currentTime
  }
}

export const clockUtil = new ClockUtil()
