import App from './component/App.js'

try{
  const myApp = new App({
    selector: '#myApp',
    title: 'Mission2'
  })
} catch (e){
  console.error(e)
}
