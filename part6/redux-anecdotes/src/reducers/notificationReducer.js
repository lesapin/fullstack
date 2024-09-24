import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "",
  reducers: {
    notify(state, action) {
      return action.payload
    },
    reset(state, action) {
      return ""
    }
  }
})

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(notify(content))
    await setTimeout(() => dispatch(reset()), timeout * 1000)
  }
}

export const { notify, reset } = notificationSlice.actions
export default notificationSlice.reducer
