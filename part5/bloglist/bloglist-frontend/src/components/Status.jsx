const Status = ({ message, color }) => {
  if (message.length === 0) {
    return null
  }

  const boxStyle = {
    color: color,
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={boxStyle}>
      {message}
    </div>  
  )
}

export default Status
