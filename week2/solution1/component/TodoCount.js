function TodoCount(props) {
  if (!(this instanceof TodoCount)) throw new Error('new 연산자를 사용해주세요.')
  const { completedCount, total, selector } = props
  checkSelector(selector)
  this.$target = document.querySelector(selector)
  this.completedCount = completedCount
  this.total = total

  this.render = () => {
    this.$target.innerHTML = `
      <div>완료: ${this.completedCount}/${this.total}</div>
    `
  }
  this.setState = ({ completedCount, total }) => {
    this.total = total
    this.completedCount = completedCount
    this.render()
  }

  this.render()
}
