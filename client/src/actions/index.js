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
const fetchUser = () => {
  return function (dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }))
  }
}
