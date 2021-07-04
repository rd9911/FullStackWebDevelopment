import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' // To get smaller element { component.container.querySelector() }
import Toggable from '../components/Toggable'


describe('render', () => {
  let component
  beforeEach(() => {
    component = render(
      <Toggable btnLabel='show'>
        <div className='check' />
      </Toggable>
    )
  })

  test('children is defined', () => {
    expect(component.container.querySelector('.check')).toBeDefined()
  })

  test('in the first render it does not show children', () => {
    const childDiv = component.container.querySelector('.show-child')
    expect(childDiv).toHaveStyle('display: None')
  })

  test('after clicking show button child is shown', () => {
    const button = component.container.querySelector('input')
    fireEvent.click(button)
    const childDiv = component.container.querySelector('.show-child')
    expect(childDiv).not.toHaveStyle('display: None')
  })
})