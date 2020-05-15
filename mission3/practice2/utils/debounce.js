let timer = ''

const debounce = (f, tick) => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    f()
  }, tick)
}

export default debounce
