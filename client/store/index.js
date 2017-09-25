import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import cities from './cities'
import neighborhoods from './neighborhoods'
import buddies from './buddies'
import requestedRun from './requestedRuns'
import incomingRequests from './incomingRequests'
import upcomingRun from './upcomingRun'
import pastRuns from './pastRuns'
import allRuns from './allRuns'

const reducer = combineReducers({user, cities, buddies, requestedRun, incomingRequests, upcomingRun, pastRuns, allRuns, neighborhoods})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cities'
export * from './buddies'
export * from './requestedRuns'
export * from './incomingRequests'
export * from './upcomingRun'
export * from './pastRuns'
export * from './allRuns'
export * from './neighborhoods'
