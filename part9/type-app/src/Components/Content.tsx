import React from 'react'
import { CoursePart } from '../utils';
import Part from './Part';

export interface ContentProps {
    courses: CoursePart[];
}

export default function Content( {courses}: ContentProps ) {
  return (
    <div>
        { courses.map( part => <Part key={part.name} course={part} /> ) }
    </div>
  )
}
