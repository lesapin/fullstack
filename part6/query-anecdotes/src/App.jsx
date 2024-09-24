import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, vote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation({ 
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = anecdote => {
    voteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if (result.isLoading) {
    return <>loading...</>
  }
  else if (result.isError) {
    return <>anecdote service not available due to server error</>
  }
  
  const anecdotes = result.data

  return (
    <>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
