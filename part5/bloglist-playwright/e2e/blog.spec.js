const { test, expect, describe, beforeEach } = require('@playwright/test')
const { createBlog, secondUserCreateBlog } = require('./helper')
    
describe('blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'roope',
        username: 'roba',
        password: 'salasana'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByText('login to application')).toBeVisible()
  })

  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByTestId('username').fill('roba')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('roba logged in')).not.toBeVisible()
    await expect(page.getByText('login to application')).toBeVisible()
    await expect(page.getByText('Wrong username or password')).toBeVisible()
  })

  test('login succeeds with correct credentials', async ({ page }) => {
    await page.getByTestId('username').fill('roba')
    await page.getByTestId('password').fill('salasana')
    await page.getByRole('button', { name: 'login' }).click()

    //await expect(page.getByText('roba logged in')).toBeVisible()
    await expect(page.getByText('login to application')).not.toBeVisible()
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('roba')
      await page.getByTestId('password').fill('salasana')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'For Whom the Bell Tolls', 'E. Hemingway', 'www.hemingway.com')

      await expect(page.getByText('a new blog For Whom the Bell Tolls by E. Hemingway added')).toBeVisible()
      const div = await page.locator('.blog')
      await expect(div).toContainText('For Whom the Bell Tolls E. Hemingway')
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'For Whom the Bell Tolls', 'E. Hemingway', 'www.hemingway.com')

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      const div = await page.locator('.blog-details')
      await expect(div).toContainText('likes 1')
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page, 'For Whom the Bell Tolls', 'E. Hemingway', 'www.hemingway.com')
      await page.reload()
      
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()
      await page.reload()

      await expect(page.getByText('For Whom the Bell Tolls E. Hemingway added')).not.toBeVisible()
    })

    test('can not delete a blog by another user', async ({ page, request }) => {
      await secondUserCreateBlog(page, request)

      await page.getByTestId('username').fill('roba')
      await page.getByTestId('password').fill('salasana')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      
      await expect(page.getByText('Dummy Blog Dummy Author')).toBeVisible()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})
