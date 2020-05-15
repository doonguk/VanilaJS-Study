import Component from './COmponent.js'
import { checkSelector } from '../utils/validation.js'
import throttle from '../utils/throttle.js'

function createHTMLElement(element) {
  const { url, title } = element
  const $wrapDiv = document.createElement('div')
  const $titleDiv = document.createElement('div')
  $titleDiv.textContent = title

  const image = new Image()
  image.src = url
  image.onload = () => {

  }

  $wrapDiv.appendChild($titleDiv)
  $wrapDiv.appendChild(image)
  return $wrapDiv
}


export default class SearchResult extends Component{
  constructor(props) {
    super(props)
    const { selector, images } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.images = images
    this.componentMount()
    this.render()
    this.bindEvent()
  }

  componentMount() {
    this.isUseComponent = false
    this.currentPage = 1
    this.size = 10
  }

  render() {
    if (this.isUseComponent) {
      if (this.images.length === 0) this.$target.innerHTML = '검색어에 맞는 결과가 없습니다.'
      else {
        const startIndex = (this.currentPage - 1) * this.size
        const endIndex = startIndex + this.size
        if (this.currentPage === 1) this.$target.innerHTML = `<div>총 ${this.images.length}개의 짤 검색완료!</div>`
        const currentRenderImages = this.images.slice(startIndex, endIndex)
        currentRenderImages.forEach((image) => {
          this.$target.appendChild(createHTMLElement(image))
        })
      }
    } else {
      this.$target.innerHTML = `<div>검색어를 입력하세요~~~</div>`
    }
  }

  setState(nextImages) {
    this.isUseComponent = true
    this.images = nextImages
    this.render()
  }

  bindEvent() {
    window.addEventListener('scroll', () => {
      if (this.images.length > (this.currentPage -  1) * 10 + this.size) {
        const { offsetHeight } = document.body
        if (window.scrollY + window.innerHeight >= offsetHeight) {
          this.currentPage += 1
          throttle(this.render.bind(this), 400)
        }
      }
    })
  }
}
