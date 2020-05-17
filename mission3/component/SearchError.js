import { checkSelector, checkError } from '../utils/validation.js'

export default class SearchError {
  constructor(props) {
    const { selector } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.status = ''
    this.message = ''
    this.render()
  }

  render() {
    if (this.status && this.message) {
      this.$target.innerHTML = `<div><b>코드: ${this.status}</b>, 내용: ${this.message}</div>`
    }
  }

  setState({ status, message }) {
    checkError(status, message)
    this.status = status
    this.message = message
    this.render()
  }
}
