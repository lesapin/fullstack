import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notify, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      dispatch({ type: 'ERROR', payload: error })
      setTimeout(() => dispatch({ type: 'RESET' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({ content: content, votes: 0 })
    dispatch({ type: 'CREATE', payload: content })
    setTimeout(() => dispatch({ type: 'RESET' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
