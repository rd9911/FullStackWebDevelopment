export const isExist = (arr, item) => {
    arr.map(arrItem => {
      console.log(arrItem.name, item)
      if (arrItem.name === item) {
        return true;
      } else {
        return false;
      }
    })
  } 

