import { checkSelector } from '../utils/validation.js'

export default class SearchHistory {
  constructor(props) {
    const { selector, histories, onSearch } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.histories = histories
    this.onSearch = onSearch
    this.render()
    this.bindEvent()
  }

  render() {
    this.$target.innerHTML = this.histories.map((history, index) => {
      const { id, keyword } = history
      return `<li data-id=${id} class="history-item">${index + 1}. ${keyword}</li>`
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
