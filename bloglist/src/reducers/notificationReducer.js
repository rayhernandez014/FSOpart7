import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null
}

let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const callNotification = (message, type, time) => {
  return (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    const timeout = time * 1000
    dispatch(setNotification({ message, type }))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer
