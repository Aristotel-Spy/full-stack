//<Header course = {course["name"]}/>
//<Content name1 = {course.parts[0]["name"]} name2={course.parts[1]["name"]} name3={course.parts[2]["name"]} 
//exe1={course.parts[0].exercises} exe2={course.parts[1].exercises} exe3={course.parts[2].exercises}/>
//<Total totalExe={course["parts"][0].exercises+course["parts"][1].exercises+course["parts"][2].exercises}/>


const Course = (props)=>{
    
    const { course } = props

    //console.log(parts)

    return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    )
}


const Header = (props) =>{

    return(
    <h1>{props.course}</h1>
    )
    
  }
  
const Content = (props) =>{

    const { parts } = props
    //list of parts

    
    //we need a key to remove the warning,we can use the .id of the parts.
    return(
        <div>
            
            {parts.map(part =>{

                return (<Part key={part.id} name={part.name} exercises={part.exercises}/>)

            })}
            
        </div>
        
    )
}   
  
const Total = (props) =>{

    //a list of parts which are basically objects/dictionaries(Pyth)

    const {parts} = props

    //in order to .reduce() , we are going to have to map()
    //our array/list 'parts' so that it only contains the num
    //of exercises.

    const exercises = parts.map(part=>part.exercises)

    //now that we have mapped it to contain the exercises number
    //we can reduce it easily.

    return (
        <p>
          <strong>Total of {exercises.reduce((previous,next) => previous+next)} exercises </strong>
        </p>
    )
}
  
const Part = (props) =>{

    return(
        <p>{props.name} {props.exercises}</p>
    )
}

export default Course