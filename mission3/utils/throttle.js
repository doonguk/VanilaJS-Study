let timer = ''

const throttle = (f, tick) => {
  if (!timer) {
    timer = setTimeout(() => {
      timer = ''
      f()
    }, tick)
  }
}

export default throttle
