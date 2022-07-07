import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing blog form')
  await user.type(authorInput, 'me again')
  await user.type(urlInput, 'newblog.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog form')
  expect(createBlog.mock.calls[0][0].author).toBe('me again')
  expect(createBlog.mock.calls[0][0].url).toBe('newblog.com')
})
