import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import cities from './cities'
import buddies from './buddies'
import requestedRun from './requestedRuns'
import incomingRequests from './incomingRequests'
import runs from './runs'

const reducer = combineReducers({user, cities, buddies, requestedRun, incomingRequests, runs})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cities'
export * from './buddies'
export * from './requestedRuns'
export * from './incomingRequests'
export * from './runs'
