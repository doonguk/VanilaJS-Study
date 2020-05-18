import { checkSelector } from '../utils/validation.js'
import debounce from '../utils/debounce.js'

export default class SearchInput {
  constructor(props) {
    const { selector, onSearch, onAddHistory } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.onSearch = onSearch
    this.onAddHistory = onAddHistory
    this.render()
    this.bindEvents()
  }

  render() {
    this.$input = document.createElement('input')
    this.$input.setAttribute('type', 'text')
    this.$input.setAttribute('placeholder', '키워드를 입력해주세요 :)')
    this.$input.setAttribute('autofocus', 'true')
    this.$target.appendChild(this.$input)
  }

  bindEvents() {
    this.$input.addEventListener('keyup', debounce((e) => this.onSearch(e.target.value), 500))
    this.$input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.value) {
        this.onAddHistory(e.target.value)
        e.target.value = ''
        this.$input.focus()
      }
    })
  }
}
