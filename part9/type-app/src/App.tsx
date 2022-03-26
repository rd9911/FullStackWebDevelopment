import React from 'react';
import Header from '../Components/Header'
import Content from '../Components/Content'
import Total from '../Components/Total'

function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseTitle={courseName} />
      <Content {...courseParts} />
      <Total {...courseParts} />
    </div>
  );
}

export default App;
