export const Part = ({ part }) => {
    return (
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>    
    )
  }
  