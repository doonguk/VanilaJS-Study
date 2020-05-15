import App from './component/App.js'

try{
  new App({
    selector: '#App',
    title: '신기한 움짤 검색기',
  })
} catch (e) {
  console.error(e)
}
