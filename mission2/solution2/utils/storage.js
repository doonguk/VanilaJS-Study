export const storage = {
  get: (STORAGE_DATA, defaultData = []) => {
    try {
      const data = JSON.parse(window.localStorage.getItem(STORAGE_DATA))
      return data
    } catch (e) {
      return defaultData
    }
  },
  set: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}
