export const Total = ({ course }) => {
    const reducer = (accumulator, currentVal) => accumulator + currentVal
    const sum = course.parts.map(part => part.exercises)
                            .reduce(reducer);
    return (<p>Number of exercises {sum}</p>);
  }