import { createSlice } from '@reduxjs/toolkit'

const initialState = { timeoutId: 0, content: "" }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notifyCreate(state, action) {
      return { ...state, content: `you created '${action.payload}'` }
    },
    notifyVote(state, action) {
      return { ...state, content: `you voted for '${action.payload}'`}
    },
    reset(state, action) {
      clearTimeout(state.timeoutId)
      return { timeoutId: setTimeout(() => console.log("reset"), 5000), content: "" } 
    }
  }
})

export const { notifyCreate, notifyVote, reset } = notificationSlice.actions
export default notificationSlice.reducer
