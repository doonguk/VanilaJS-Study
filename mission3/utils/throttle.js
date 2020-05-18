const throttle = (f, tick) => {
  let timer = ''
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = ''
        f(...args)
      }, tick)
    }
  }
}

export default throttle
