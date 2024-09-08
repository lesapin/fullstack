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
      title: <input type="text" value={title} id="Title" onChange={({ target }) => setTitle(target.value)} />
      author: <input type="text" value={author} id="Author" onChange={({ target }) => setAuthor(target.value)} />
      url: <input type="text" value={url} id="Url" onChange={({ target }) => setUrl(target.value)} />
      <button type="submit">create</button>
    </form>
  )
}

export default Create
