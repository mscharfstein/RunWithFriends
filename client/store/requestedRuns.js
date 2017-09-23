import axios from 'axios'
import history from '../history'
import {setIncomingReq} from '../store'

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

export function addBuddyToRunRequest(runId, partnerId, partnerPhone) {
  return function thunk(dispatch) {
    return axios.put('/api/requestedRuns', {runId, partnerId, partnerPhone})
      .then(res => res.data)
      .then(run => {
        dispatch(setReqRun(run));
      })
    }
  }

export function deleteRequest(runId) {
    return function thunk(dispatch) {
      return axios.delete(`/api/requestedRuns/${runId}`)
        .then(() => {
          dispatch(setIncomingReq([]));
        })
      }
    }

export function text(number, content) {
  return function thunk(dispatch) {
    return axios.post('/api/text',{number, content})
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
