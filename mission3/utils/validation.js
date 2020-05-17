export const checkSelector = (selector) => {
  const $target = document.querySelector(selector)
  if (!$target) throw new Error('해당 element가 존재하지 않습니다.')
}

export const checkResults = (results) => {
  if (!Array.isArray(results)) throw new Error('images type must be Array')
  if (results.length > 0) {
    results.forEach((element) => {
      const { imageUrl, title } = element
      if (typeof title !== 'string') throw new Error('title type must be String')
      else if (typeof imageUrl !== 'string') throw new Error('imageUrl type must be String')
    })
  }
}

export const checkError = (status, message) => {
  if (typeof status !== 'number') throw new Error('error code must be Number')
  else if (typeof message !== 'string') throw new Error('error message must be String')
}
