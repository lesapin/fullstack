import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
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
      return action.payload.sort((a, b) => {
	if (a.votes < b.votes) return 1
	if (b.votes > a.votes) return -1
	return 0
      })
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const result = await anecdoteService.getAll()
    dispatch(setAnecdotes(result))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const result = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(result))
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const result = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteAnecdote(result.id))
  }
}

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
