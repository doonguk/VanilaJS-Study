import Component from './Component.js'
import {checkSelector} from '../utils/validation.js'
import debounce from '../utils/debounce.js'

export default class SearchInput extends Component {
  constructor(props) {
    super()
    const {selector, onAddHistory, onSearch} = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.onAddHistory = onAddHistory
    this.onSearch = onSearch
    this.render()
    this.bindEvents()
  }

  render() {
    this.$input = document.createElement('input')
    this.$input.setAttribute('type', 'text')
    this.$input.setAttribute('placeholder', '할 일을 입력해주세요 :)')
    this.$input.setAttribute('autofocus', 'true')
    this.$target.appendChild(this.$input)
  }

  bindEvents() {
    this.$input.addEventListener('keyup', (e) => {
      if (e.target.value.trim()) {
        if (e.key === 'Enter') {
          this.onAddHistory(e.target.value)
          e.target.value = ''
          this.$input.focus()
        } else {
          debounce(() => this.onSearch(e.target.value), 300)
        }
      }
    })
  }
}
