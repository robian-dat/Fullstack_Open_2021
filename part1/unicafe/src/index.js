import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Update = (updater, newState) => {
  updater(newState)
}

const Button = ({updater, newState, text}) => (
  <button onClick={() => Update(updater, newState)}>
    {text}
  </button>
)

const Statistic = (props) => {

  switch (props.statType) {
    case 'count':
      console.log(props.sentiments, props.statType)
      return (
        <tr>
          <td>{props.questionSentiment}</td>
          <td>{props.sentiments[props.questionSentiment]}</td>
        </tr>
      );
    case 'all':
      return (
        <tr>
          <td>{props.statType}</td>
          <td>{props.sentiments.total}</td>
        </tr>
    );
    case 'average':
      return (
        <tr>
          <td>{props.statType}</td>
          <td>{(props.sentiments.good - props.sentiments.bad)/props.sentiments.total}</td>
        </tr>
      );
    case 'percent':
      return (
        <tr>
          <td>{props.statType} {props.questionSentiment}</td> 
          <td>{props.sentiments[props.questionSentiment]/props.sentiments.total*100}%</td>
        </tr>
      );
    default:
      return(<p>invalid statType</p>)
  }
}

const Statistics = ({good, neutral, bad}) => {
  const sentiments = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: good + neutral + bad
  }

  if (sentiments.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <Statistic statType='count' sentiments={sentiments} questionSentiment='good'/>
        <Statistic statType='count' sentiments={sentiments} questionSentiment='neutral'/>
        <Statistic statType='count' sentiments={sentiments} questionSentiment='bad'/>
        <Statistic statType='all' sentiments={sentiments} />
        <Statistic statType='average' sentiments={sentiments} />
        <Statistic statType='percent' sentiments={sentiments} questionSentiment='good'/>
      </table>
    </div>
  ) 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button updater={setGood} newState={good + 1} text='good' />
        <Button updater={setNeutral} newState={neutral + 1} text='neutral' />
        <Button updater={setBad} newState={bad + 1} text='bad' />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
);
