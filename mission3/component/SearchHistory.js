import Component from './Component.js'
import { checkSelector } from '../utils/validation.js'

export default class SearchHistory extends Component {
  constructor(props) {
    super()
    const { selector, histories, onSearch } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.histories = histories
    this.onSearch = onSearch
    this.render()
    this.bindEvent()
  }

  render() {
    this.$target.innerHTML = this.histories.map((history) => {
      const { id, value } = history
      return `<li data-id=history-${id}>${value}</li>`
    }).join('')
  }

  setState(nextData) {
    this.histories = nextData
    this.render()
  }

  bindEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        const { dataset } = e.target
        if (dataset.id) this.onSearch(e.target.textContent)
      }
    })
  }
}
