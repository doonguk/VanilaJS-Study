export default function Header(props) {
  if (new.target !== Header) {
    throw new Error('Please use \'new\' keyword')
  }
  const { selector, userName } = props

  this.init = () => {
    const $box = document.createElement('header')
    this.$title = document.createElement('h1')
    this.$title.innerHTML = `${userName}의 TodoList`
    $box.appendChild(this.$title)

    const $target = document.querySelector(selector)
    $target.appendChild($box)
  }

  this.setState = (userName) => {
    this.$title.innerHTML = `${userName}의 TodoList`
  }

  this.init()
}
