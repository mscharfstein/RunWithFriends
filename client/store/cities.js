import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CITIES = 'GET_CITIES'

/**
 * ACTION CREATORS
 */
const getCities = cities => ({type: GET_CITIES, cities})

/**
 * THUNK CREATORS
 */
export function fetchCities() {

return function thunk(dispatch) {
  return axios.get('/api/cities')
    .then(res => res.data)
    .then(cities => {
      dispatch(getCities(cities));
    })
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CITIES:
      return action.cities
    default:
      return state
  }
}
