import SearchHistory from './SearchHistory.js'
import SearchInput from './SearchInput.js'
import SearchResult from './SearchResult.js'
import SearchError from './SearchError.js'
import request from '../apis/api.js'
import { checkSelector, checkResults } from '../utils/validation.js'

export default class App {
  constructor(props) {
    const { selector, title } = props
    checkSelector(selector)
    this.$target = document.querySelector(selector)
    this.title = title
    this.componentBeforeMount()
    this.render()
  }

  render() {
    const searchHistoryClassName = 'search-history'
    const searchInputClassName = 'search-input'
    const searchResultClassName = 'search-result'
    const searchErrorClassName = 'search-error'
    this.$target.innerHTML = `<div class="app-container">
                                <h1>${this.title}</h1>
                                <ul class=${searchHistoryClassName}></ul>
                                <div class=${searchInputClassName}></div>
                                <div class=${searchErrorClassName}></div>
                                <div class=${searchResultClassName}></div>
                              </div>`

    this.$searchHistory = new SearchHistory({
      selector: `.${searchHistoryClassName}`,
      histories: this.histories,
      onSearch: this.handleSearch.bind(this),
    })

    new SearchInput({
      selector: `.${searchInputClassName}`,
      onSearch: this.handleSearch.bind(this),
      onAddHistory: this.handleAddHistory.bind(this),
    })

    this.$searchResult = new SearchResult({
      selector: `.${searchResultClassName}`,
      images: this.data,
    })

    this.$searchError = new SearchError({
      selector: `.${searchErrorClassName}`,
    })
  }

  componentBeforeMount() {
    this.nextId = null // for history indexing
    this.data = []
    this.histories = []
  }

  setState(nextData) {
    if (JSON.stringify(this.data) !== JSON.stringify(nextData)) {
      checkResults(nextData)
      this.data = nextData
      this.$searchResult.setState(nextData)
    }
  }

  async handleSearch(keyword) {
    if (!keyword) { return }
    try {
      const res = await request(keyword)
      const result = await res.json()
      if (result.length > 0) {
        this.setState(result
          .map((element) => ({
            imageUrl: element.imageUrl,
            title: element.title,
          }))
          .filter((element) => element.imageUrl))
      }
    } catch (e) {
      const { status, message } = e
      this.$searchError.setState({
        status,
        message,
      })
    }
  }

  handleAddHistory(keyword) {
    if (!keyword) { return }
    this.nextId++
    this.histories = [...this.histories, {
      id: this.nextId,
      keyword,
    }]
    this.$searchHistory.setState(this.histories)
  }
}
