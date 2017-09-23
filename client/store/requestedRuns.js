import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_REQ_RUN = 'SET_REQ_RUN'

/**
 * ACTION CREATORS
 */
const setReqRun = run => ({type: SET_REQ_RUN, run})

/**
 * THUNK CREATORS
 */
export function addRequestedRun(runInfo) {
return function thunk(dispatch) {
  return axios.post('/api/requestedRuns', runInfo)
    .then(res => res.data)
    .then(run => {
      dispatch(setReqRun(run));
    })
  }
}

export function addBuddyToRunRequest(profileId, partnerId) {
  return function thunk(dispatch) {
    return axios.put('/api/requestedRuns', {profileId, partnerId})
      .then(res => res.data)
      .then(run => {
        dispatch(setReqRun(run));
      })
    }
  }

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_REQ_RUN:
      return action.run
    default:
      return state
  }
}
