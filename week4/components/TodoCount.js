export default function TodoCount(props) {
  if (new.target !== TodoCount) {
    throw new Error('Please use \'new\' keyword')
  }
  const { selector, completedCount, total } = props

  this.init = () => {
    this.$section = document.createElement('section')
    this.$section.className = 'todo-count'
    this.$section.textContent = `얼마나 진행됐나요? ${completedCount}/${total}`

    const $target = document.querySelector(selector)
    $target.appendChild(this.$section)
  }

  this.setState = ({ completedCount, total }) => {
    this.$section.innerHTML = `얼마나 진행됐나요? ${completedCount}/${total}`
  }

  this.init()
}
