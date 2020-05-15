import App from './components/App.js'

try {
  new App({
    selector: '#App',
    title: 'Nice 움짤 검색기',
  })
} catch (e) {
  console.error(e)
}
