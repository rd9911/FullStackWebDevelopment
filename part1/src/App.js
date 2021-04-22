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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const add = (accumulator, currentVal) => accumulator + currentVal;

  return (
    <div>
      <Header courseName={course} />
      <Content courseNames={parts.map(part => part.name)} numOfExercises={parts.map(part => part.exercises)} />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}


export default App;
