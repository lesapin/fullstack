import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Create from './Create'

describe('<Create />', () => {
  const blog = {
    title: "Example title",
    author: "Author name",
    url: "www.example.com",
    likes: 5
  }

  test('create form submits the right information', async () => {
    const mockCreate = vi.fn(e => e.preventDefault())
    const user = userEvent.setup()
    
    const { container } = render(
      <Create handleCreate={mockCreate} />
    )

    const form = container.querySelector('.createForm')
    const title = container.querySelector('#Title')
    const author = container.querySelector('#Author')
    const url = container.querySelector('#Url')
    const button = screen.getByText('create')

    await user.type(title, blog.title)
    await user.type(author, blog.author)
    await user.type(url, blog.url)
    
    await user.click(button)

    expect(mockCreate.mock.calls[0][0].target.children[0].value).toBe(blog.title)
    expect(mockCreate.mock.calls[0][0].target.children[1].value).toBe(blog.author)
    expect(mockCreate.mock.calls[0][0].target.children[2].value).toBe(blog.url)
  })
})
