import axios from 'axios'
import { FETCH_USER } from './types'

// normal way
// const fetchUser = () => {
// const request = axios.get('/api/current_user')

// return {
//  type: FETCH_USER,
//    payload: request
//  }
// }

// action creator
// hijacking the dispatch function using thunk (middleware)
// export const fetchUser = () => {
//  return function (dispatch) {
//  axios
//  .get('/api/current_user')
//  .then(res => dispatch({ type: FETCH_USER, payload: res }))
// }
// }

export const fetchUser = () => async dispatch => {
  // request made to the backend server for the current user
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  dispatch({ type: FETCH_USER, payload: res.data })
}
