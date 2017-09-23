import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_INCOMING_REQ = 'SET_INCOMING_REQ'

/**
 * ACTION CREATORS
 */
const setIncomingReq = run => ({type: SET_INCOMING_REQ, run})

/**
 * THUNK CREATORS
 */
export function fetchRequests(profileId) {
return function thunk(dispatch) {
  return axios.get(`/api/incomingRequests/${profileId}`)
    .then(res => res.data)
    .then(run => {
      dispatch(setIncomingReq(run));
    })
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_INCOMING_REQ:
      return action.run
    default:
      return state
  }
}
