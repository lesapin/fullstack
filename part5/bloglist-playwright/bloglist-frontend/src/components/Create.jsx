import { useState } from 'react'

const Create = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetForm = (event) => {
    handleCreate(event)

    /*
    setTitle('')
    setAuthor('')
    setUrl('')
    */
  }

  return (
    <form className='createForm' onSubmit={resetForm}>
      title: <input type="text" value={title} data-testid="title" onChange={({ target }) => setTitle(target.value)} /><br />
      author: <input type="text" value={author} data-testid="author" onChange={({ target }) => setAuthor(target.value)} /><br />
      url: <input type="text" value={url} data-testid="url" onChange={({ target }) => setUrl(target.value)} /><br />
      <button type="submit">create</button>
    </form>
  )
}

export default Create
