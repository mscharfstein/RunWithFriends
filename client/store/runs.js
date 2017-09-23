import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_RUN = 'SET_RUN'

/**
 * ACTION CREATORS
 */
const setRun = run => ({type: SET_RUN, run})

/**
 * THUNK CREATORS
 */
export function createRun(runInfo) {
return function thunk(dispatch) {
  return axios.post('/api/runs', runInfo)
    .then(res => res.data)
    .then(run => {
      dispatch(setRun(run));
    })
  }
}


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_RUN:
      return action.run
    default:
      return state
  }
}
