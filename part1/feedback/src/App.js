import React, { useState } from "react";

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = ({text, value}) => {
    return (
      <tbody>
        <tr>
          <th scope='row' style={{textAlign:'left'}}>{text}</th>
          <td>{value}</td>
        </tr>
      </tbody>
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
      return (positiveFeedbacks / all.length) + "%";
    }
    return 0;
  }

  return (
    <div>
      <h1>Give a feedback</h1>
      <Button handleClick={incrementGoodFeedback} text='Good' />
      <Button handleClick={incrementNeutralFeedback} text='Neutral' />
      <Button handleClick={incrementBadFeeback} text='Bad' />
      <h1>Statistics</h1>
      <table>
        <Statistics text='Good' value={feedback.good} />
        <Statistics text='Neutral' value={feedback.neutral} />
        <Statistics text='Bad' value={feedback.bad} />
        <Statistics text='All' value={allFeedbacks.length} />
        <Statistics text='Average' value={average(allFeedbacks)} />
        <Statistics text='Positive' value={positivePercentage(feedback.good, allFeedbacks)} />
      </table>
    </div>
  )

}



export default App;
