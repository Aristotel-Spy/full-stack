import { useState } from 'react'


const Statistics = (props) =>{

  const {good,bad,neutral,all,avg,pos} = props

  if(all==0){
    return(
      <div>
        <p>No Feedback Given</p>
      </div>
    )
  }

  

  return(
    <div>
      <table>
        <tbody>
          <StatisticLine statistic={good} text="good"/>
          <StatisticLine statistic={neutral} text="neutral"/>
          <StatisticLine statistic={bad} text="bad"/>
          <StatisticLine statistic={all} text="all"/>
          <StatisticLine statistic={avg} text="average"/>
          <StatisticLine statistic={pos} text="positive" perc="%"/>
        </tbody>
      </table>
    </div>

  )
}

const Button = (props) => {

  const {onClick,text} = props

  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) =>{
  const {statistic,text,perc} = props
  
  return(
    <tr>
    <td>{text}</td>
    <td>{statistic} {perc}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)

  //event handler functions for good,neutral,bad.

  //implement the all counter, don't forget react is asynchronus,so setGood(good+1) for example
  //will not increment good at this current iteration of the App running,but at the next one.

  const handleGood = () => {
    setGood(good+1)

    const goodCounter = good+1
    setAll(goodCounter+bad+neutral)
  }

  const handleNeutral = () =>{
    setNeutral(neutral+1)

    const neutralCounter=neutral+1
    setAll(good+bad+neutralCounter)
  }

  const handleBad = () =>{
    setBad(bad+1)

    const badCounter = bad+1
    setAll(good+badCounter+neutral)
  }
 

  return (
    <div>
      <h1>Give Feedback</h1>
      <br></br>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <br></br>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} avg={parseFloat(((1*good+0*neutral-1*bad)/all).toFixed(1))} pos={parseFloat(((good/all)*100).toFixed(1))}/>
    </div>
  )
}

export default App