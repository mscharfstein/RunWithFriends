import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_BUDDIES = 'SET_BUDDIES'

/**
 * ACTION CREATORS
 */
const setBuddies = users => ({ type: SET_BUDDIES, users })

export function findBuddies(run) {
  return function thunk(dispatch) {
    return axios.put('/api/buddies/find', run)
      .then(res => res.data)
      .then(users => {
        console.log('users', users)
        dispatch(setBuddies(users));
      })
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case SET_BUDDIES:
      return action.users
    default:
      return state
  }
}

