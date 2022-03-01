import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    text: 'Component testing is done with react-testing-library',
    done: true
  }

  const mockFunction = () => null;
  const mockComponent = null;

  const component = render(
    <Todo todo={todo} doneInfo={mockComponent} notdoneInfo={mockComponent}/>
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})