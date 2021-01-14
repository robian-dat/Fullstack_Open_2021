import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ clickHandler, text }) => {
  return (
    <>
      <button onClick={clickHandler}>{text}</button>
    </>
  )
}

const updateAnecdote = (anecdotes, selected, setSelected) => {
  let newAnecdote = Math.floor((Math.random() * anecdotes.length))
  while (selected === newAnecdote) {
    newAnecdote = Math.floor((Math.random() * anecdotes.length))
  }
  setSelected(newAnecdote)
}

const addVote = (votedAnecdotes, selected, setVotes) => {
  const votedAnecdotesCopy = {...votedAnecdotes}
  if (selected in votedAnecdotesCopy) {
    votedAnecdotesCopy[selected] += 1
  }
  else {
    votedAnecdotesCopy[selected] = 1
  }
  setVotes(votedAnecdotesCopy)
}

const MostVotes = ({ votedAnecdotes }) => {
  let winningAnecdote = ''
  let maxVotes = 0
  for (const anecdote in votedAnecdotes) {
    if (votedAnecdotes[anecdote] > maxVotes) {
      winningAnecdote = anecdote.slice()
      maxVotes = votedAnecdotes[anecdote]
    }
  }
  
  if (maxVotes > 0) {
    return(
      <>
        <div>{winningAnecdote}</div>
        <div>has {maxVotes} votes</div>
      </>
    )
  }
  else {
    return(
      <div>No votes yet!</div>
    )
  }

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votedAnecdotes, setVotes] = useState({})

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        votes: {votedAnecdotes[props.anecdotes[selected]]}
      </div>
      <div>
        <Button clickHandler={() => addVote(votedAnecdotes, props.anecdotes[selected], setVotes)} text='vote' />
        <Button clickHandler={() => updateAnecdote(props.anecdotes, selected, setSelected)} text='next anecdote' /> 
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotes votedAnecdotes={votedAnecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);
