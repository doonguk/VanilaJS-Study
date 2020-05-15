import Component from '../Component.js'
import { checkSelector } from '../../utils/validation.js'

export default class Modal extends Component {
  constructor(props) {
    super()
    const { selector, visible, onVisible } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.visible = visible
    this.onVisible = onVisible
    this.render()
    this.bindEvent()
  }

  render() {
    if (this.visible) {
      this.$target.innerHTML = `
        <div class="gray-bg">
         <div class="modal-wrapper">
            <div class="modal-close">X</div>
            <div class="modal-des">컨텐츠가 없습니다.</div>
          </div>    
        </div>`
    } else {
      this.$target.innerHTML = ''
    }
  }

  bindEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.className === 'modal-close') this.onVisible()
    })
  }

  setState(nextVisible) {
    this.visible = nextVisible
    this.render()
  }
}
