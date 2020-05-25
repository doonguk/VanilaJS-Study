import { checkSelector } from './utils/validation.js'
import { USER_NAME, DELAY } from './utils/constants.js'
import { Header, TodoInput, TodoList, TodoUsers } from './components/index.js'
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
    await this.handleGetUsers() // get users
    this.$header = new Header({
      selector,
      userName: this.userName,
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

    this.handleGetTodos(this.userName) // initial Data load
  }

  this.handleGetUsers = async () => {
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
    this.handleGetTodos(this.userName)
    this.$header.setState(this.userName)
  }

  this.handleAddTodo = async (content) => {
    try {
      await fetchManager({
        method: 'POST',
        path: `/${this.userName}`,
        body: { content },
      })
      this.handleGetTodos(this.userName)
    } catch (e) {
      this.$errorModal.editTitleAndContent(e.message)
      this.$errorModal.setState(true) // modal on
    }
  }// need edit

  this.handleGetTodos = async (userName) => {
    try {
      this.$loadingModal.setState(true) // loading modal on
      this.todos = await fetchManager({
        method: 'GET',
        path: `/${userName}`,
        delay: DELAY, // 2500
      })
      this.$loadingModal.setState(false) // loading modal off
      this.$todoList.setState(this.todos)
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
      this.handleGetTodos(this.userName)
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
      this.handleGetTodos(this.userName)
    } catch (e) {
      this.$errorModal.editTitleAndContent(e.message)
      this.$errorModal.setState(true) // modal on
    }
  }

  this.init()
}
