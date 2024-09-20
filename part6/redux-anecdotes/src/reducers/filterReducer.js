import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterString(state, action) {
      const content = action.payload
      return content
    }
  }
})

/*
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload
    }
    default:
      return state
  }
}

export const filterString = string => {
  return {
    type: 'SET_FILTER',
    payload: string,
  }
}
*/

export const { filterString } = filterSlice.actions
export default filterSlice.reducer
