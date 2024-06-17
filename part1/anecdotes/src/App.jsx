import { useState } from 'react'

const Button = (props) =>{

  const {onClick,text} = props

  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0})

  const randomIndex = () =>{

    const randomNum =  Math.floor(Math.random() * 7)
    setSelected(randomNum)
  }

  const castVote = () =>{

    const copyPoints = {...points}
    //console.log(copyPoints) debugging

    copyPoints[selected]+=1// or you cannot do copyPoints.selected, because it will
    //not recognize selected as the index but rather as the element "selected" itself.
    //which doesn't exist.
    setPoints(copyPoints)
  }

  //find max value of object and set it's key to the indx variable.
  let max = 0
  let indx = 0

  for (const key in points){
    
    const value = points[key]

    if(value>=max){
      max=value
      indx=key
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <br></br>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button onClick={castVote} text="Vote"/>
      <Button onClick={randomIndex} text="Next Anecdote"/>
      <br></br>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indx]}
      <p>has {points[indx]} votes</p>
    </div>
  )
}

export default App