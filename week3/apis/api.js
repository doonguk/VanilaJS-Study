const APP_URL = 'https://jjalbot.com/api/jjals'

const request = async (keyword) => await fetch(`${APP_URL}?text=${keyword}`)

export default request
