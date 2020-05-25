import ErrorModal from './modal/ErrorModal.js'

export default function TodoInput(props) {
  if (new.target !== TodoInput) {
    throw new Error('Please use \'new\' keyword')
  }
  const { selector, onAddTodo } = props

  this.init = () => {
    const $inputSection = document.createElement('section')
    $inputSection.id = 'todo-input'

    this.$input = document.createElement('input')
    this.$input.type = 'text'
    this.$input.placeholder = '할 일을 입력하세요 :)'

    this.$inputButton = document.createElement('button')
    this.$inputButton.className = 'input-btn'
    this.$inputButton.innerHTML = 'ADD'

    $inputSection.appendChild(this.$input)
    $inputSection.appendChild(this.$inputButton)
    const $app = document.querySelector(selector)
    $app.appendChild($inputSection)

    this.$todoInputErrorModal = new ErrorModal({
      selector: '#todo-input',
      title: '입력 오류',
      content: '할 일을 입력해주세요!!',
    })
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && e.target.value.trim()) {
        onAddTodo(e.target.value)
        e.target.value = ''
        e.target.focus()
      }
    })
    this.$inputButton.addEventListener('click', () => {
      if (this.$input.value.trim()) {
        onAddTodo(this.$input.value)
        this.$input.value = ''
        this.$input.focus()
      } else {
        this.$todoInputErrorModal.setState(true) // modal on
      }
    })
  }

  this.init()
}
