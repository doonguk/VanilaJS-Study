export default function ModalWrapper({ selector, $children }) {
  if (new.target !== ModalWrapper) {
    throw new Error('Please use \'new\' keyword')
  }
  this.render = () => {
    this.$target = document.querySelector(selector)

    this.$grayBg = document.createElement('div')
    this.$grayBg.className = 'gray-bg'
    this.$grayBg.style.display = 'none'

    this.$modalWrapper = document.createElement('div')
    this.$modalWrapper.className = 'modal-wrapper'

    this.$modalWrapper.appendChild($children)
    this.$grayBg.appendChild(this.$modalWrapper)
    this.$target.appendChild(this.$grayBg)

    this.bindEvents()
  }

  this.setState = (visible) => {
    this.$grayBg.style.display = visible ? 'block' : 'none'
  }

  this.bindEvents = () => {
    this.$grayBg.addEventListener('click', (e) => {
      if (e.target.className === 'gray-bg') {
        this.setState(false) // modal off
      }
    })
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.setState(false)
      }
    })
  } // esc > modal off

  this.render()
}
