import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author only by default', () => {
  const blog = {
    title: 'testing react blog',
    author: 'me',
    url: 'randomurl.com'
  }

  const container = render(<Blog blog={blog} />).container

  const main = container.querySelector('.main')
  expect(main).toHaveTextContent('testing react blog')
  expect(main).toHaveTextContent('me')
  expect(main).not.toHaveStyle('diplay: none')

  const details = container.querySelector('.details')
  expect(details).toHaveStyle('display: none')
})

test('renders url and likes too if view button clicked', async () => {
  const blog = {
    title: 'testing react blog',
    author: 'me',
    url: 'randomurl.com'
  }

  const container = render(<Blog blog={blog} />).container

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const main = container.querySelector('.main')
  expect(main).toHaveStyle('display: none')

  const details = container.querySelector('.details')
  expect(details).not.toHaveStyle('display: none')
})

test('detects if like button has been clicked twice', async () => {
  const blog = {
    title: 'testing react blog',
    author: 'me',
    url: 'randomurl.com'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} increaseLikes={mockHandler} />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
