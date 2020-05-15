import Component from './Component.js'
import SearchInput from './SearchInput.js'
import SearchHistory from './SearchHistory.js'
import SearchResult from './SearchResult.js'
import Modal from './modal/Modal.js'
import { checkSelector, checkImages } from '../utils/validation.js'
import request from '../apis/api.js'

export default class App extends Component {
  constructor(props){
    super()
    const { selector, title } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.title = title
    this.componentMount()
    this.render()
  }

  render() {
    const searchInputSelector = 'search-input'
    const searchHistorySelector = 'search-history'
    const searchResultSelector = 'search-result'
    const modalSelector = 'modal'
    this.$target.innerHTML = `<div class="app-container">
                                <h1>${this.title}</h1>
                                <ul class=${searchHistorySelector}></ul>
                                <div class=${searchInputSelector}></div>
                                <div class=${searchResultSelector}></div>
                                <div class=${modalSelector}></div>
                              </div>`

    new SearchInput({
      selector: `.${searchInputSelector}`,
      onAddHistory: this.handleAddHistory.bind(this),
      onSearch: this.handleSearch.bind(this),
    })

    this.$searchHistory = new SearchHistory({
      selector: `.${searchHistorySelector}`,
      histories: this.histories,
      onSearch: this.handleSearch.bind(this),
      onDeleteHistory: this.handleDeleteHistory.bind(this)
    })

    this.$searchResult = new SearchResult({
      selector: `.${searchResultSelector}`,
      images: this.images
    })

    //modal
    this.$modal = new Modal({
      selector: `.${modalSelector}`,
      visible: this.modalVisible,
      onVisible: this.handleModalVisible.bind(this),
    })
    window.addEventListener('click', (e) => {
      if (this.modalVisible) {
        const { className } = e.target
        if (className && className === 'gray-bg') {
          this.handleModalVisible()
        }
      }
    })
  }

  componentMount() {
    this.histories = []
    this.images = []
    this.nextId = -1 // for history indexing
    this.modalVisible = false
  }

  setState(nextImages) {
    // if (JSON.stringify(nextImages) !== JSON.stringify(this.images)) {}
    checkImages(nextImages)
    this.$searchResult.setState(nextImages)
  }

  handleAddHistory(keyword) {
    this.histories = this.histories.concat( {id: this.nextId + 1, value: keyword })
    this.$searchHistory.setState(this.histories)
    this.nextId += 1
  }

  async handleSearch(keyword) {
    try{
      const res = await request(keyword)
      const result = await res.json()
      if (result.length === 0){
        this.handleModalVisible()
      } else {
        const nextImages = result
          .map((element) => ({title: element.title, url: element.imageUrl}))
          .filter((element) => element.url)
        this.setState(nextImages)
      }
    } catch (e){
      console.error(e)
    }
  }

  handleDeleteHistory (id) {
    this.histories = this.histories.filter((history) => history.id !== id)
    this.$searchHistory.setState(this.histories)
  }

  handleModalVisible () {
    this.modalVisible = !this.modalVisible
    this.$modal.setState(this.modalVisible)
  }
}
