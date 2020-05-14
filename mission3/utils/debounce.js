let timer = ''
const debounce = (callback, tick) => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    callback()
  }, tick)
}

export default debounce
