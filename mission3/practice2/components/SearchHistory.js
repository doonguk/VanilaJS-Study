import Component from './Component.js'
import { checkSelector, checkHistory } from '../utils/validation.js'

export default class SearchHistory extends Component {
  constructor (props) {
    super()
    const { selector, histories, onSearch, onDeleteHistory } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.histories = histories
    this.onSearch = onSearch
    this.onDeleteHistory = onDeleteHistory
    this.render()
    this.bindEvent()
  }

  render() {
    this.$target.innerHTML = this.histories.map((history) => {
      const { id, value } = history
      return `<li data-id=${id}><span>${value}</span><button class="delete-btn">Del</button></li>`
    }).join('')
  }

  setState(nextData) {
    checkHistory(nextData)
    this.histories = nextData
    this.render()
  }

  bindEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'button') {
        const { dataset } = e.target.parentNode
        this.onDeleteHistory(Number(dataset.id))
      } else if (e.target.tagName.toLowerCase() === 'span'){
        this.onSearch(e.target.textContent)
      }
    })
  }
}
