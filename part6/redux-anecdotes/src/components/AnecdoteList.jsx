import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notifyVote, reset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(s => 
    s.anecdotes.filter(anecdote => 
      anecdote.content.includes(s.filter)
    )
  )

  const dispatch = useDispatch()

  const dispatchVote = anecdote => {
    dispatch(notifyVote(anecdote.content))
    dispatch(vote(anecdote.id))
    setTimeout(() => dispatch(reset()), 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatchVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
