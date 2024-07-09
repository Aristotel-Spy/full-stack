
const Header = ({ courseName }: { courseName:string }) =>{

  return(
    <h1>
      {courseName}
    </h1>
  )

}

const Part = ( { part }: { part:CoursePart } ) =>{

  switch(part.kind){

    case "basic":
      return(<p>
        <strong>{part.name} {part.exerciseCount}</strong>
        <br></br>
        <em>{part.description}</em>
      </p>)
    case "group":
      return(<p>
        <strong>{part.name} {part.exerciseCount}</strong>
        <br></br>
        project exercises {part.groupProjectCount}
      </p>)
    case "background":
      return(<div>
        <strong>{part.name} {part.exerciseCount}</strong>
        <br></br>
        <em>{part.description}</em>
        <div>submit to {part.backgroundMaterial}</div>
      </div>)
    case "special":
      return(<div>
        <strong>{part.name} {part.exerciseCount}</strong>
        <br></br>
        <em>{part.description}</em>
        <div>required skills: {part.requirements.join(",")}</div>
      </div>)
     default:
      return(<div>
      </div>)
  }


}

const Content = ({ courseParts }: { courseParts:CoursePart[]}) => {

  return(
    <div>
      {courseParts.map(part => {

        return(<div key={part.name}> <Part part={part} /> </div>)
      })}
    </div>
  )
}

const Total = ( { courseParts } : {courseParts:CoursePart[]}) => {

  return(<div>

    Number of Exercises: {courseParts.reduce((sum,part) =>{

      return sum+part.exerciseCount

    },0)}
    
  </div>)


}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDes extends CoursePartBase {
  description:string;
}

interface CoursePartBasic extends CoursePartBaseDes {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseDes {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseDes {
  requirements:string[]
  kind:"special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const App = () => {

  const courseName = "Half Stack application development";
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;