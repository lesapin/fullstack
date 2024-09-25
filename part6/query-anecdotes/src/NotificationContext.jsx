import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote '${action.payload}' voted`
    case 'CREATE':
      return `anecdote '${action.payload}' created`
    case 'ERROR':
      return `error: ${action.payload}`
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notify, notifyDispatch] = useReducer(notifyReducer, '')

  return (
    <NotificationContext.Provider value={[notify, notifyDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
