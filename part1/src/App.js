import React from "react";

const Part = (props) => {
  return (
    <div>
      <p>{props.courseName} {props.numOfExercises}</p>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <p>{props.courseName}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part courseName={props.courseNames[0]} numOfExercises={props.numOfExercises[0]} />
      <Part courseName={props.courseNames[1]} numOfExercises={props.numOfExercises[1]} />
      <Part courseName={props.courseNames[2]} numOfExercises={props.numOfExercises[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>{props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course} />
      <Content courseNames={[part1, part2, part3]} numOfExercises={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1+exercises2+exercises3} />
    </div>
  )
}


export default App;
