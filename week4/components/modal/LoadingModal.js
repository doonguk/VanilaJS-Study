import ModalWrapper from './ModalWrapper.js'

export default function LoadingModal(props) {
  if (new.target !== LoadingModal) {
    throw new Error('Please use \'new\' keyword')
  }
  const { selector } = props

  this.init = () => {
    const $children = document.createElement('span')
    $children.className = 'loading'

    this.$loading = new ModalWrapper({
      selector,
      $children,
    })
  }

  this.setState = (visible) => {
    this.$loading.setState(visible)
  }
  this.init()
}
