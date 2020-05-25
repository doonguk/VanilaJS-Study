import { API_URL } from '../utils/constants.js'
import { checkFetchManagerArgs } from '../utils/validation.js'

export default async function fetchManager({
  path, method = 'GET', body, headers, delay,
}) {
  checkFetchManagerArgs({
    path,
    method,
    body,
    headers,
    delay,
  })
  let url = API_URL + path
  if (delay) url += `?delay=${delay}`
  const options = {
    method,
    headers: {
      'content-Type': 'application/json',
    },
  }
  if (body) {
    options.body = JSON.stringify({ ...body })
  }
  if (headers) {
    options.headers = { ...options.headers, ...headers }
  }
  console.log(JSON.stringify({ url, ...options }, null, 2))
  const response = await fetch(url, options)
  return await response.json()
}
