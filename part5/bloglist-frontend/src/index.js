import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userLoginReducer from './reducers/userLoginReducer userLoginReducer'
import usersInfoReducer from './reducers/usersInfoReducer'
import toggleReducer from './reducers/toggableReducer'


const reducer = combineReducers({
  blogs: blogsReducer,
  userLogged: userLoginReducer,
  notification: notificationReducer,
  usersInfo: usersInfoReducer,
  visible: toggleReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)