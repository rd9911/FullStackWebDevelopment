/* eslint-disable no-undef */
export const clearForm = () => {
  for (let x = 0; arguments.length > 0; x++) {
    arguments[x]('')
  }
}