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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseName={course} />
      <Content courseNames={[part1.name, part2.name, part3.name]} numOfExercises={[part1.exercises, part2.exercises, part3.exercises]} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}


export default App;
