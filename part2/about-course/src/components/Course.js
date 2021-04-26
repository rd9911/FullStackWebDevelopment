import { Header } from './Header'
import { Total } from './Total'
import { Content } from './Content'

export const Course = ({ courses }) => {
    return (  
        <div>
        {courses.map(course => {
            return (
            <div>
              <Header course={course} />
              <Content course={course} key={course.id} />
              <Total course={course} />
            </div>
            )
        })}
      </div>
    )
  }