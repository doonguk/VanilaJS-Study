import Component from './Component.js'
import {checkSelector} from "../utils/validation.js"

export default class TodoCount extends Component{
  constructor(props) {
    super ()
    const { selector, completedCount, total } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.completedCount = completedCount
    this.total = total
    this.render()
  }

  render(){
    this.$target.innerHTML = `<div>Completed: ${this.completedCount} / ${this.total}</div>`
  }
  setState({completedCount, total}){
    this.completedCount = completedCount
    this.total = total
    this.render()
  }
}
