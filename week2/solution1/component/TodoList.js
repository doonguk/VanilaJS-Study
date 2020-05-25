function convertElementToHTMLString(element) {
  const { text, isCompleted } = element
  return isCompleted ? `<s>${text}</s>` : text
}

function TodoList(props) {
  if (!(this instanceof TodoList)) throw new Error('new 연산자를 사용해주세요.')
  const { todos, selector, onToggle, onDelete } = props
  checkSelector(selector)
  checkData(todos)

  this.$target = document.querySelector(selector)
  this.data = todos
  this.render = () => {
    this.$target.innerHTML = this.data.map((element) =>
      `<li data-id=${element.id}>
        ${element.id + 1}. ${convertElementToHTMLString(element)}
        <button class="toggle-btn">Fin</button>
        <button class="delete-btn">Del</button>
      </li>`)
      .join('')
  }

  this.$target.addEventListener('click', (e) => {
    if (e.target) {
      const className = e.target.getAttribute('class')
      if (className && className === 'toggle-btn') {
        onToggle(Number(e.target.parentNode.dataset.id))
      } else if (className && className === 'delete-btn') {
        onDelete(Number(e.target.parentNode.dataset.id))
      }
    }
  })

  this.setState = (newData) => {
    checkData(newData)
    this.data = newData
    this.render()
  }
  this.render()
}
