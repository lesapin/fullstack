import { useState } from 'react'

const Blog = ({ handleLike, handleDelete, blog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeButton = (event) => {
    handleLike(blog)
  }

  const deleteButton = (event) => {
    handleDelete(blog)
  }

    console.log(user, blog)
  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div className='blog-details' style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={likeButton}>like</button><br />
        {blog.user.name}<br />
        {user.username === blog.user.username ? <button onClick={deleteButton}>remove</button> : ''}
      </div>
    </div>
  )
}

export default Blog
