export const isExist = (arr, item) => {
  let found = arr.find(arrItem => arrItem.name === item) ? true : false
  return found
  }