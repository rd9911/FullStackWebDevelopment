import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userLoginReducer from './reducers/userLoginReducer userLoginReducer'
import usersInfoReducer from './reducers/usersInfoReducer'


const reducer = combineReducers({
  blogs: blogsReducer,
  userLogin: userLoginReducer,
  notification: notificationReducer,
  usersInfo: usersInfoReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)