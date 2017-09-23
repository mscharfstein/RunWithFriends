import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PAST_RUNS = 'SET_PAST_RUNS'

/**
 * ACTION CREATORS
 */
const setPastRuns = run => ({type: SET_PAST_RUNS, runs})

/**
 * THUNK CREATORS
 */
export function fetchPastRuns(profileId) {
return function thunk(dispatch) {
  return axios.get(`/api/runs/history/${profileId}`)
    .then(res => res.data)
    .then(runs => {
      dispatch(setPastRuns(runs));
    })
  }
}


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PAST_RUNS:
      return action.runs
    default:
      return state
  }
}
