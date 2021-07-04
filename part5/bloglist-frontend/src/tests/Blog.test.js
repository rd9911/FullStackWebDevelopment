import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' // To get smaller element { component.container.querySelector() }
import Blog from '../components/Blog'

const blog = {
  title: 'Hello',
  author: 'Ulou Lop',
  url: 'kol.com',
  likes: 5
}

describe('test render of <Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )

  })

  test('render', () => {
    const blogRepresentation = component.container.querySelector('.short-view')
    expect(blogRepresentation).toHaveTextContent('Hello by Ulou Lop')
    // component.debug()
  })
})

test('full detailed blog is rendered after click of | view | button and | like | function works', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} onLikeBlog={mockHandler} />
  )

  const viewBtn = component.getByText('view')
  fireEvent.click(viewBtn)
  const blogRepresentation = component.container.querySelector('.detail-view')
  expect(blogRepresentation).toHaveTextContent('Hello by Ulou Lop on kol.com likes 5')

  const likeBtn = component.getByText('like')
  fireEvent.click(likeBtn)
  expect(mockHandler.mock.calls).toHaveLength(1)

  fireEvent.click(likeBtn)
  expect(mockHandler.mock.calls).toHaveLength(2)


  // component.debug()
})
