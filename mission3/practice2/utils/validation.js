export const checkSelector = (selector) => {
  const $target = document.querySelector(selector)
  if (!$target) throw new Error('target element is not exist')
}

export const checkHistory = (histories) => {
  if (!Array.isArray(histories)) throw new Error('histories must be Array')
  histories.forEach((history) => {
    const validKeys = new Set(['id', 'value'])
    const keys = Object.keys(history)
    keys.forEach((key) => {
      if (validKeys.has(key)) {
        validKeys.delete(key)
        8
      } else {
        throw new Error('유효하지 않은 Property 입니다.')
      }
    })
    if (validKeys.size !== 0) throw new Error('history의 타입이 올바르지 않습니다.')
  })
}

export const checkImages = (images) => {
  if (!Array.isArray(images)) throw new Error('state must be Array')
  if (images.length > 0) {
    images.forEach((image) => {
      const validKeys = new Set(['title', 'url'])
      const keys = Object.keys(image)
      keys.forEach((key) => {
        if (validKeys.has(key)) {
          validKeys.delete(key)
        } else throw new Error('유효하지 않은 Property 입니다.')
      })
      if (validKeys.size !== 0) throw new Error('image의 타입이 올바르지 않습니다.')
    })
  }
}
