import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ALL_RUNS = 'SET_ALL_RUNS'

/**
 * ACTION CREATORS
 */
const setAllRuns = runs => ({type: SET_ALL_RUNS, runs})

/**
 * THUNK CREATORS
 */
export function fetchAllRuns(profileId) {
return function thunk(dispatch) {
  return axios.get(`/api/runs/${profileId}`)
    .then(res => res.data)
    .then(runs => {
      dispatch(setAllRuns(runs));
    })
  }
}


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_ALL_RUNS:
      return action.runs
    default:
      return state
  }
}
