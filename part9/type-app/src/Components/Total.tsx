import React from 'react'
import { ContentProps } from './Content'

export default function Total(props: ContentProps) {
    const totalExercises = props.courses.reduce((a, b) => a+b.exerciseCount, 0)
  return (
    <div>
        <p>Number of exercises {totalExercises}</p>
    </div>
  )
}
