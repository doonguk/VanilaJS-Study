import Component from './Component.js'
import {checkSelector, checkData} from "../utils/validation.js"


function convertElementToHTMLString(element){
  const { text, isCompleted } = element
  return isCompleted ? `<s>${text}</s>` : text
}

export default class TodoList extends Component {
  constructor(props) {
    const {selector, todos, onToggle, onDelete} = props
    super();
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.data = todos
    this.onToggle = onToggle
    this.onDelete = onDelete
    this.render()
    this.bindEvent()
  }

  render() {
    this.$target.innerHTML = this.data.map((element) => `
    <li data-id=${element.id}>
        ${convertElementToHTMLString(element)}
        <button class="finish-btn">Fin</button>
        <button class="delete-btn">Del</button>
    </li>`).join('')
  }

  bindEvent(){ // event 위임
    this.$target.addEventListener('click', (e) => {
      const { target } = e
      if (target && target.className === 'finish-btn'){
        const { dataset } = e.target.parentNode
        if (dataset && dataset.id){
          this.onToggle(Number(dataset.id))
        }
      } else if (target && target.className === 'delete-btn'){
        const { dataset } = e.target.parentNode
        if (dataset && dataset.id){
          this.onDelete(Number(dataset.id))
        }
      }
    })
  }

  setState(nextData){
    checkData(nextData)
    this.data = nextData
    this.render()
  }
}

