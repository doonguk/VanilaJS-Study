import { checkSelector } from './utils/validation.js'
import { USER_NAME, DELAY_TIME } from './utils/constants.js'
import { Header, TodoCount, TodoInput, TodoList, TodoUsers } from './components/index.js'
import { ErrorModal, LoadingModal } from './components/modal/index.js'
import fetchManager from './api/api.js'

export default function App(props) {
  if (new.target !== App) {
    throw new Error('Please use \'new\' Keyword')
  }
  const { selector } = props
  checkSelector(selector)
  this.userName = USER_NAME
  this.todos = []

  this.init = async () => {
    await this.loadUsers() // get users
    this.$header = new Header({
      selector,
      userName: this.userName,
    })

    this.$todoCount = new TodoCount({
      selector,
      completedCount: this.todos.filter(({ isCompleted }) => isCompleted).length,
      total: this.todos.length,
    })

    this.$todoInput = new TodoInput({
      selector,
      onAddTodo: this.handleAddTodo,
    })

    // list Section Start
    const $listSection = document.createElement('section') // todoUsers + todoList
    $listSection.className = 'main-list'
    const $target = document.querySelector(selector)
    $target.appendChild($listSection)

    this.$todoUsers = new TodoUsers({
      selector: '.main-list',
      users: this.users,
      onChangeUser: this.handleChangeUser,
    })
    this.$todoList = new TodoList({
      selector: '.main-list',
      todos: this.todos,
      onToggle: this.handleToggleTodo,
      onDelete: this.handleDeleteTodo,
    })
    // list Section End

    this.$errorModal = new ErrorModal({
      selector,
      title: '오류 발생..',
      content: 'temp content',
    })

    this.$loadingModal = new LoadingModal({ selector })

    this.getTodos(this.userName) // initial Data load
  }

  this.loadUsers = async () => {
    try {
      this.users = await fetchManager({
        method: 'GET',
        path: '/users',
      })
    } catch (e) {
      this.$errorModal.editTitleAndContent(e.message)
      this.$errorModal.setState(true) // modal on
    }
  }

  this.handleChangeUser = (userName) => {
    this.userName = userName
    this.getTodos(this.userName)
    this.$header.setState(this.userName)
  }

  this.handleAddTodo = async (content) => {
    try {
      await fetchManager({
        method: 'POST',
        path: `/${this.userName}`,
        body: { content },
      })
      this.getTodos(this.userName)
    } catch (e) {
      this.$errorModal.editTitleAndContent(e.message)
      this.$errorModal.setState(true) // modal on
    }
  }// need edit

  this.getTodos = async (userName) => {
    try {
      this.$loadingModal.setState(true) // loading modal on
      this.todos = await fetchManager({
        method: 'GET',
        path: `/${userName}`,
        delay: DELAY_TIME, // 2500
      })
      this.$loadingModal.setState(false) // loading modal off
      this.$todoList.setState(this.todos)
      this.$todoCount.setState({
        completedCount: this.todos.filter(({isCompleted}) => isCompleted).length,
        total: this.todos.length,
      })
    } catch (e) {
      this.$loadingModal.setState(false) // loading modal off
      this.$errorModal.editTitleAndContent(e.message)
      this.$errorModal.setState(true) // error modal on
    }
  }

  this.handleToggleTodo = async (id) => {
    try {
      await fetchManager({
        method: 'PUT',
        path: `/${this.userName}/${id}/toggle`,
      })
      this.getTodos(this.userName)
    } catch (e) {
      this.$errorModal.editTitleAndContent(e.message)
      this.$errorModal.setState(true) // modal on
    }
  }

  this.handleDeleteTodo = async (id) => {
    try {
      await fetchManager({
        method: 'DELETE',
        path: `/${this.userName}/${id}`,
      })
      this.getTodos(this.userName)
    } catch (e) {
      this.$errorModal.editTitleAndContent(e.message)
      this.$errorModal.setState(true) // modal on
    }
  }

  this.init()
}
