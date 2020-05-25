export const checkSelector = (selector) => {
  const $target = document.querySelector(selector)
  if (!$target) throw new Error('Don\'t exist DOM Element')
}

export const checkModalArguments = ({ selector, title, content }) => {
  checkSelector(selector)
  if (!title || !content) throw new Error('invalid Parameter')
}

export const checkTodos = (todos) => {
  if (!Array.isArray(todos)) {
    throw new Error('todos must be Array')
  }
  const typeMap = new Map([
    ['_id', 'string'],
    ['content', 'string'],
    ['isCompleted', 'boolean'],
  ])
  todos.forEach((todo) => {
    const validKeys = new Set(['_id', 'content', 'isCompleted'])
    const keys = Object.keys(todo)
    keys.forEach((key) => {
      if (validKeys.has(key)) {
        if (typeof todo[key] !== typeMap.get(key)) throw new Error('invalid key type')
        validKeys.delete(key)
      } else {
        throw new Error('invalid key type')
      }
    })
  })
}

export const checkUsers = (users) => {
  if (!Array.isArray(users)) {
    throw new Error('Users must be Array')
  }
  if (users.length > 0) {
    users.forEach((user) => {
      if (typeof user !== 'string') {
        throw new Error('User must be String')
      }
    })
  }
}

export const checkFetchManagerArgs = (args) => {
  const { path, method, delay } = args
  const methodSet = new Set(['GET', 'POST', 'PUT', 'DELETE'])
  if (path && typeof path !== 'string') {
    throw new Error('params must be string')
  } else if ( method && !methodSet.has(method)) {
    throw new Error('invalid method type')
  } else if ( delay && typeof delay !== 'number') {
    throw new Error('delay must be number')
  }
  // need body, headers type check
}
