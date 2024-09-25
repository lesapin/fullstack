import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notify] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notify === '') return <></>

  return (
    <div style={style}>
      {notify}    
    </div>
  )
}

export default Notification
