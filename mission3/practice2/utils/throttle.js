let timer

const throttle = (f, tick) => {
  if (!timer){
    timer = setTimeout(() => {
      f()
    }, tick)
  }
}

export default throttle
