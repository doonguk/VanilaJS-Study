import Component from "./Component.js"
import {checkSelector} from "../utils/validation.js"

export default class TodoInput extends Component {
  constructor(props) {
    const { selector, onInput } = props
    super()
    checkSelector(selector)
    this.onInput = onInput
    this.$target = document.querySelector(selector)

    this.render()
  }

  render() {
    this.$input = document.createElement('input')
    this.$input.setAttribute('type', 'text')
    this.$input.setAttribute('placeholder', '할 일을 입력해주세요.')

    this.$input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (e.target.value.trim() === '') {
          alert('할 일을 입력해주세요.')
        } else {
          this.onInput(e.target.value)
          e.target.value = ''
          this.$input.focus()
        }
      }
    })
    this.$target.appendChild(this.$input)
  }
}
