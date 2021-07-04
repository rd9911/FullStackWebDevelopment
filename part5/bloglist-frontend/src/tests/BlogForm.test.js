import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' // To get smaller element { component.container.querySelector() }
import BlogForm from '../components/BlogForm'

test('posting a blog via <Blog />', () => {
  const blog = {
    title: 'Hello',
    author: 'Ulou Lop',
    url: 'kol.com',
    likes: 5
  }
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm onBlogPost={mockHandler} />
  )
  const titleInput = component.container.querySelector('.title')
  const authorInput = component.container.querySelector('.author')
  const urlInput = component.container.querySelector('.url')
  const form = component.container.querySelector('form')

  // find a way to fill all forms in once in fireEvent.change()
  fireEvent.change(titleInput, {
    target: { value: 'Hello' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Ulou Lop' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'kol.com' }
  })
  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Hello')
  expect(mockHandler.mock.calls[0][0].author).toBe('Ulou Lop')
  expect(mockHandler.mock.calls[0][0].url).toBe('kol.com')
  // expect(component.container).toHaveTextContent('Hello')
  // component.debug()
})

