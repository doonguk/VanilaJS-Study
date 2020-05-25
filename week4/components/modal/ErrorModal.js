import ModalWrapper from './ModalWrapper.js'
import { checkModalArguments } from '../../utils/validation.js'

export default function ErrorModal({ selector, title, content }) {
  if (new.target !== ErrorModal) {
    throw new Error('Please use \'new\' Keyword')
  }
  checkModalArguments({
    selector,
    title,
    content,
  })

  this.render = () => {
    const $children = document.createElement('div') // input error modal box
    $children.className = 'error-box'
    this.$title = document.createElement('h2')
    this.$title.innerHTML = title

    this.$modalContent = document.createElement('div')
    this.$modalContent.className = 'modal-content'
    this.$modalContent.innerHTML = content

    this.$closeButton = document.createElement('button')
    this.$closeButton.className = 'modal-close'
    this.$closeButton.innerHTML = '닫기'

    $children.appendChild(this.$title)
    $children.appendChild(this.$modalContent)
    $children.appendChild(this.$closeButton)
    this.$todoInputErrorModal = new ModalWrapper({
      selector,
      $children,
    })
    this.bindEvent()
  }

  this.editTitleAndContent = (content) => {
    this.$modalContent.innerHTML = content
  }

  this.setState = (visible) => {
    this.$todoInputErrorModal.setState(visible)
  }

  this.bindEvent = () => {
    this.$closeButton.addEventListener('click', () => {
      this.setState(false) // modal off
    })
  }

  this.render()
}
