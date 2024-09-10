import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: "Example title",
    author: "Author name",
    url: "www.example.com",
    likes: 5
  }

  const user = {
    name: "Test user"
  }

  const mockLike = vi.fn()
  const mockDelete = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog handleLike={mockLike} 
            handleDelete={mockDelete} 
            blog={blog} user={user} />
    ).container
  })

  test('only render title and author by default', () => {
    const div = container.querySelector('.blog')
    const divDetails = container.querySelector('.blog-details')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(divDetails).toHaveStyle('display: none')
  })

  test('url and likes become visible after clicking a button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).not.toHaveStyle('display: none')
  })

  test('like handler is called twice after two clicks', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')

    await user.click(button)
    await user.click(button)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})
