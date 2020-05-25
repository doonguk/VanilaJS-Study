import { checkSelector } from '../utils/validation.js'
import throttle from '../utils/throttle.js'

const createHTMLElement = (element) => {
  const { imageUrl, title } = element
  const $item = document.createElement('div')
  $item.setAttribute('class', 'image-item')

  const $loadingDiv = document.createElement('div')
  $loadingDiv.className = 'loading'
  $loadingDiv.style = 'display: none'
  $loadingDiv.textContent = 'loading...'

  const $itemTitle = document.createElement('div')
  $itemTitle.className = 'item-title'
  $itemTitle.textContent = title

  const image = new Image()
  image.src = imageUrl
  image.alt = ''
  image.onload = () => {
    $loadingDiv.className = ''
  }

  $item.appendChild($loadingDiv)
  $item.appendChild(image)
  $item.appendChild($itemTitle)
  return $item
}

export default class SearchResult {
  constructor(props) {
    const { selector, images } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.images = images
    this.componentBeforeMount()
    this.render()
  }

  render() {
    // 해봐야 하는 것 >검색 안했을 때, 로딩 중 + lazy loading?, 검색 후
    if (this.isSearched) {
      const startIndex = (this.currentPage - 1) * (this.size)
      const endIndex = startIndex + this.size
      const currentRenderImages = this.images.slice(startIndex, endIndex)
      if (startIndex === 0) {
        this.$target.innerHTML = `<h2>총 ${this.images.length}개 짤 검색완료.</h2>` // 처음에만,
      }
      currentRenderImages.forEach((image) => {
        this.$target.appendChild(createHTMLElement(image))
      })
    } else { // initial render
      this.$target.innerHTML = '<div>검색어를 기다리고 있어요.</div>'
    }
  }

  componentBeforeMount() {
    this.currentPage = 1 // scroll에 따른 lazy loading
    this.size = 10
    this.isSearched = false // 검색 안했을 때, 했을 때 flag
    window.addEventListener('scroll', () => {
      if (this.images.length > ((this.currentPage - 1) * 10 + this.size)) { // this가 SearchResult ?
        const { offsetHeight } = document.body
        if (window.scrollY + window.innerHeight >= offsetHeight) {
          this.currentPage += 1
          throttle(this.render.bind(this), 400)()
        }
      }
    })
  }

  setState(nextData) {
    this.isSearched = true
    this.currentPage = 1
    this.images = nextData
    this.render()
  }
}
