const Header = (props) =>{

  return(
  <h1>{props.course}</h1>
  )
  
}

const Content = (props) =>{
  return(
    <div>
      <Part name={props.name1} exercises={props.exe1}/>
      <Part name={props.name2} exercises={props.exe2}/>
      <Part name={props.name3} exercises={props.exe3}/>
    </div>
    
  )
}

const Total = (props) =>{
  return (
    <p>
      Number of exercises: {props.totalExe}
    </p>
  )
}

const Part = (props) =>{
  return(
    <p>{props.name} {props.exercises}</p>
  )
}



const App = () => {
  
  const course = {
    name:"Half Stack application development",
    parts:[
      {
        name : 'Fundamentals of React',
        exercises : 10
      },
  
      {
        name: 'Using props to pass data',
        exercises: 7
      },
  
      {
        name:'State of a component',
        exercises:14
      }
  
    ]
  }
  

  return (
    <div>
      <Header course = {course["name"]}/>
      <Content name1 = {course.parts[0]["name"]} name2={course.parts[1]["name"]} name3={course.parts[2]["name"]} 
      exe1={course.parts[0].exercises} exe2={course.parts[1].exercises} exe3={course.parts[2].exercises}/>
      <Total totalExe={course["parts"][0].exercises+course["parts"][1].exercises+course["parts"][2].exercises}/>
    </div>
  )
}

export default App