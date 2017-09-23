import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './Routes.jsx'
import { BrowserRouter as Router } from 'react-router-dom';

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
      <Routes />
  </Provider>,
  document.getElementById('app')
)
