const debounce = (callback, tick) => {
  let timer = ''
  return (...args) => { // 어떤 상황에 debounce를 쓸지 모르니 ...args로 받자
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, tick)
  }
}

export default debounce
