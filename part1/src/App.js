import React, { useState } from "react";

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = ({good, neutral, bad, all, average, positivePercentage}) => {
  return (
  <div>
    <p>Good {good}</p>
    <p>Neutral {neutral}</p>
    <p>Bad {bad}</p>
    <p>All {all}</p>
    <p>Average {average}</p>
    <p>Positive {positivePercentage}</p>
  </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const [allFeedbacks, setAll] = useState([])


  const incrementGoodFeedback = () => {
        const newFeedback = {
        ...feedback,
        good: feedback.good + 1
      }
      setFeedback(newFeedback)
      setAll(allFeedbacks.concat(1))
      console.log(allFeedbacks)
    }
  const incrementNeutralFeedback = () => {
    const newFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1
    }
    setFeedback(newFeedback)
    setAll(allFeedbacks.concat(0))
  }
  const incrementBadFeeback = () => {
    const newFeedback = {
      ...feedback,
      bad: feedback.bad + 1
    }
    setFeedback(newFeedback)
    setAll(allFeedbacks.concat(-1))
  }

  const average = (arr) => {
    const reducer = (accumulator, currentVal) => accumulator + currentVal
    if (arr.length > 1) {
     const avg = arr.reduce(reducer) / arr.length;
     return avg;
    }
    return 0;
  }
  
  const positivePercentage = (positiveFeedbacks, all) => {
    if (all.length > 1 && positiveFeedbacks > 1) {
      return positiveFeedbacks / all.length;
    }
    return 0;
  }

  return (
    <div>
      <h1>Give feedbaallFeedbacks
allFeedbacksck</h1>
      <Button handleClick={incrementGoodFeedback} text='Good' />
      <Button handleClick={incrementNeutralFeedback} text='Neutral' />
      <Button handleClick={incrementBadFeeback} text='Bad' />
      <h1>Statistics</h1>
      <Statistics 
        good={feedback.good} 
        neutral={feedback.neutral} 
        bad={feedback.bad} 
        all={allFeedbacks.length + 5}
        average={average(allFeedbacks)} 
        positivePercentage={positivePercentage(feedback.good, allFeedbacks)}
      />   
    </div>
  )

}



export default App;
