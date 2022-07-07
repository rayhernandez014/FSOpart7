import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { callNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = loginSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    const username = credentials.username
    const password = credentials.password
    try {
      const receivedUser = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(receivedUser)
      )
      blogService.setToken(receivedUser.token)
      dispatch(setUser(receivedUser))
      dispatch(
        callNotification(`you logged in as ${receivedUser.name}!`, 'success', 5)
      )
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    const { login } = getState()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(
      callNotification(`user ${login.name} has logged out!`, 'success', 5)
    )
    dispatch(setUser(null))
  }
}

export const initializeLoggedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(storedUser.token)
      dispatch(setUser(storedUser))
    }
  }
}

export default loginSlice.reducer
