import Component from './Component.js'
import SearchHistory from './SearchHistory.js'
import SearchInput from './SearchInput.js'
import SearchResult from './SearchResult.js'
import SearchError from './SearchError.js'
import request  from '../apis/api.js'
import { checkSelector, checkImages } from '../utils/validation.js'

export default class App extends Component {
  constructor(props) {
    super()
    const { selector, title } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.title = title
    this.componentMount()
    this.render()
  }

  render() {
    const searchHistorySelector = 'search-history'
    const searchInputSelector = 'search-input'
    const searchResultSelector = 'search-result'
    const searchErrorSelector = 'search-error'
    this.$target.innerHTML = `<div>
                                <h1>${this.title}</h1>
                                <ul class=${searchHistorySelector}></ul>
                                <div class=${searchInputSelector}></div>
                                <div class=${searchErrorSelector}></div>
                                <div class=${searchResultSelector}></div>
                              </div>`

    this.$searchHistory = new SearchHistory({
      selector: `.${searchHistorySelector}`,
      histories: this.histories,
      onSearch: this.handleSearch.bind(this),
    })

    new SearchInput({
      selector: `.${searchInputSelector}`,
      onSearch: this.handleSearch.bind(this),
      onAddHistory: this.handleAddHistory.bind(this),
    })

    this.$searchResult = new SearchResult({
      selector: `.${searchResultSelector}`,
      images: this.data,
    })

    this.$searchError = new SearchError({
      selector: `.${searchErrorSelector}`,
    })
  }

  componentMount() {
    this.nextId = -1 // for history indexing
    this.data = []
    this.histories = []
  }

  setState(nextData) {
    if (JSON.stringify(this.data) !== JSON.stringify(nextData)) {
      checkImages(nextData)
      this.data = nextData
      this.$searchResult.setState(nextData)
    }
  }

  async handleSearch(keyword) {
    if (keyword) {
      try {
        const res = await request(keyword)
        const result = await res.json()
        if (result.length > 0) {
          this.setState(result
            .map((element) => element.imageUrl)
            .filter((element) => element))
        }
      } catch (e) {
        const { status, message } = e
        this.$searchError.setState({ status, message })
      }
    }
  }

  handleAddHistory(keyword) {
    if (keyword) {
      this.histories = this.histories.concat({
        id: this.nextId + 1,
        value: keyword,
      })
      this.nextId += 1
      this.$searchHistory.setState(this.histories)
    }
  }
}
