import Component from './Component.js'
import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from './TodoCount.js'
import {checkSelector, checkData} from "../utils/validation.js"
import {storage} from "../utils/storage.js"

export default class App extends Component {
  constructor(props) {
    super()
    const {selector, title} = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.title = title
    this.removeAllEvent = new CustomEvent('removeAll', {bubbles: true})
    this.componentMount() // data 설정
    this.render()
  }

  render() {
    const todoInputSelector = 'todo-input'
    const todoListSelector = 'todo-list'
    const todoCountSelector = 'todo-count'
    const removeAllBtnSelector = `remove-all`
    this.$target.innerHTML = `<h1>${this.title}</h1>
                              <div class=${todoInputSelector}></div>
                              <ul class=${todoListSelector}></ul>
                              <div class=${todoCountSelector}></div>
                              <div><button class=${removeAllBtnSelector}>Remove All</button></div>`
    new TodoInput({
      selector: `.${todoInputSelector}`,
      onInput: this.handleInput
    })
    this.$todoList = new TodoList({
      selector: `.${todoListSelector}`,
      todos: this.data,
      onToggle: this.handleToggle,
      onDelete: this.handleDelete,
    })
    this.$todoCount = new TodoCount({
      selector: `.${todoCountSelector}`,
      total: this.data.length,
      completedCount: this.data.filter((element) => element.isCompleted).length,
    })
    this.$target.addEventListener('removeAll', (e) => {
      this.setState([])
    })
    this.$removeAllBtn = document.querySelector(`.${removeAllBtnSelector}`)
    this.$removeAllBtn.addEventListener('click',(e)=>{
      e.target.dispatchEvent(this.removeAllEvent)
    })
  }

  componentMount() {
    const STORAGE_DATA = 'todos'
    const initialData = storage.get(STORAGE_DATA)
    checkData(initialData)
    this.data = initialData
  }

  setState(nextData) {
    if (JSON.stringify(this.data) !== JSON.stringify(nextData)) {
      this.data = nextData
      this.$todoList.setState(nextData)
      this.$todoCount.setState({
        completedCount: this.data.filter((element) => element.isCompleted).length,
        total: this.data.length
      })
      const STORAGE_DATA = 'todos'
      storage.set(STORAGE_DATA, this.data)
    }
  }

  handleInput = (value) => {
    this.setState([...this.data, {
      id: this.data.length !== 0 ? Math.max(...this.data.map((element) => element.id)) + 1 : 0,
      text: value,
      isCompleted: false,
    }])
  }

  handleToggle = (id) => {
    const targetIndex = this.data.findIndex((element) => element.id === id)
    if (targetIndex > -1) {
      const newData = [
        ...this.data.slice(0, targetIndex),
        {...this.data[targetIndex], isCompleted: !this.data[targetIndex]['isCompleted']},
        ...this.data.slice(targetIndex + 1, this.data.length)]
      this.setState(newData)
    }
  }

  handleDelete = (id) => {
    const targetIndex = this.data.findIndex((element) => element.id === id)
    if (targetIndex > -1){
      this.setState(this.data.filter((element) => element.id !== id))
    }
  }
}
