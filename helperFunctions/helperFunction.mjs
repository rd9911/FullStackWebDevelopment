export const generateId = () => {
    const randNum = Math.floor(Math.random() * 5000)
    return randNum;
}

export const isExist = (arr, name) => {
    const found = arr.find(arrItem => arrItem.name === name ? arrItem.id : false)
    return found;
}
