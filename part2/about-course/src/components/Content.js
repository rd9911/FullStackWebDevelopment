import { Part } from './Part'

export const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => {
          return (<Part part={part} key={part.id}_/>)
        })}
      </div>
    )
  }