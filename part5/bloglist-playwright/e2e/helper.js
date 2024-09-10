const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const secondUserCreateBlog = async (page, request) => {
  await request.post('/api/users', {
    data: {
      name: 'mockuser',
      username: 'test',
      password: '123'
    }
  })

  await page.getByRole('button', { name: 'logout' }).click()

  await page.getByTestId('username').fill('test')
  await page.getByTestId('password').fill('123')
  await page.getByRole('button', { name: 'login' }).click()

  await createBlog(page, 'Dummy Blog', 'Dummy Author', 'www.dummy.com')
  await page.getByRole('button', { name: 'logout' }).click()
  await page.reload()
}

export { createBlog, secondUserCreateBlog }
