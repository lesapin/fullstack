import { createSlice } from '@reduxjs/toolkit'

//const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    //id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      return state.map(anecdote => 
	anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      ).sort((a, b) => {
	if (a.votes < b.votes) return 1
	if (b.votes > a.votes) return -1
	return 0
      })  
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
