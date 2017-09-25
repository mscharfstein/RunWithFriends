import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_NEIGHBORHOODS = 'GET_NEIGHBORHOODS'

/**
 * ACTION CREATORS
 */
const getNeighborhoods = neighborhoods => ({type: GET_NEIGHBORHOODS, neighborhoods})

/**
 * THUNK CREATORS
 */
export function fetchNeighborhoods(cityName) {

return function thunk(dispatch) {
  return axios.put(`/api/cities/neighborhoods`,{cityName})
    .then(res => res.data)
    .then(neighborhoods => {
      dispatch(getNeighborhoods(neighborhoods));
    })
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_NEIGHBORHOODS:
      return action.neighborhoods
    default:
      return state
  }
}
