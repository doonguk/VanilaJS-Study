import Component from './Component.js'
import { checkSelector } from '../../utils/validation.js'

export default class SearchResult extends Component {
  constructor(props) {
    super()
    const { selector, images } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.images = images
    this.render()
  }

  render() {
    this.$target.innerHTML = this.images.map((image) => {
      return `<img src=${image} alt=""/>`
    }).join('')
  }

  setState(nextData){
    this.images = nextData
    this.render()
  }
}
