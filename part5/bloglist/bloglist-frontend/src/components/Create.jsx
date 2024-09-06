import { useState } from 'react'

const Create = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetForm = (event) => {
    handleCreate(event)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={resetForm}>
      <div>
        title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url: <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default Create
