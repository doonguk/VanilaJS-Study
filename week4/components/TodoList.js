import { checkTodos } from '../utils/validation.js'

export default function TodoList(props) {
  if (new.target !== TodoList) {
    throw new Error('Please use \'new\' keyword')
  }
  const { selector, todos, onToggle, onDelete } = props
  checkTodos(todos)
  this.todos = todos

  this.init = () => {
    const $target = document.querySelector(selector)
    const $box = document.createElement('section')
    $box.className = 'list-section'

    const $completedArticle = document.createElement('article')
    const $completedTitle = document.createElement('h2')
    $completedTitle.innerHTML = '완료'
    this.$completedList = document.createElement('ul')
    $completedArticle.appendChild($completedTitle)
    $completedArticle.appendChild(this.$completedList)

    const $notCompletedArticle = document.createElement('article')
    const $notCompletedTitle = document.createElement('h2')
    $notCompletedTitle.innerHTML = '미완료'
    this.$notCompletedList = document.createElement('ul')
    $notCompletedArticle.appendChild($notCompletedTitle)
    $notCompletedArticle.appendChild(this.$notCompletedList)

    $box.appendChild($completedArticle)
    $box.appendChild($notCompletedArticle)
    $target.appendChild($box)
    this.bindEvents()
    this.render()
  }

  this.render = () => {
    const completedArray = []
    const notCompletedArray = []
    this.todos.forEach((todo) => {
      const { isCompleted } = todo
      if (isCompleted) {
        completedArray.push(todo)
      } else {
        notCompletedArray.push(todo)
      }
    })
    this.$completedList.innerHTML = completedArray.map(({ _id, content }) => {
      return `<li data-id=${_id} draggable="true"><s>${content}</s><button>삭제</button></li>`
    })
      .join('')
    this.$notCompletedList.innerHTML = notCompletedArray.map(({ _id, content }) => {
      return `<li data-id=${_id} draggable="true">${content}<button>삭제</button></li>`
    })
      .join('')
  }

  this.bindEvents = () => {
    const clickCallback = (e) => {
      const $element = e.target.closest('li')
      if ($element && $element.dataset) {
        const { id } = $element.dataset
        if (e.target.tagName.toLowerCase() === 'button') {
          onDelete(id)
        } else {
          onToggle(id)
        }
      }
    }

    this.$notCompletedList.addEventListener('click', clickCallback)
    this.$completedList.addEventListener('click', clickCallback)

    // drag event start
    const dragStartCallback = (e) => {
      const $startParentNode = e.target.closest('ul')
      e.dataTransfer.setData('text/plain', e.target.dataset.id)
      e.dataTransfer.setData('text/html', $startParentNode)
    } // drag start

    const dragOverCallback = (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    } // moving..

    const dropCallback = (e) => {
      const $endParentNode = e.target.closest('ul')
      const targetId = e.dataTransfer.getData('text/plain')
      if (targetId) {
        const $startParentNode = e.dataTransfer.getData('text/html')
        if ($endParentNode !== $startParentNode) { // 드래그 스타트, 엔드 지점이 다른 경우에만 toggle
          onToggle(targetId)
        }
      }
    } // drag end

    this.$notCompletedList.addEventListener('dragstart', dragStartCallback)
    this.$completedList.addEventListener('dragstart', dragStartCallback)
    this.$notCompletedList.addEventListener('dragover', dragOverCallback)
    this.$completedList.addEventListener('dragover', dragOverCallback)
    this.$notCompletedList.addEventListener('drop', dropCallback)
    this.$completedList.addEventListener('drop', dropCallback)
    // drag event end
  }

  this.setState = (todos) => {
    checkTodos(todos)
    this.todos = todos
    this.render()
  }
  this.init()
}
