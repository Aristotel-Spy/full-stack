import { useState } from 'react'

import { useField } from './hooks'

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch //useMatch cannot be used in the component that defines the Router (BrowserRouter)
} from "react-router-dom"


const Menu = () => {

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to='/anecdotes'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id}> 
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) =>{

  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>

      <div>has {anecdote.votes} votes</div>

      <div>for more info see {<Link to={anecdote.info}> {anecdote.info} </Link>}</div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()

    props.addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })

    navigate('/anecdotes')

    props.setNotif(`a new anecdote ${content.value} created!`)

    setTimeout(()=>{
      props.setNotif('')
    },5000)
  }

  const clearAll = () =>{

    content.clear()
    author.clear()
    info.clear()
  }
  //<input name='content' value={content.value} onChange={content.onChange} />
  //<input name='author' value={author.value} onChange={author.onChange} />
  //<input name='info' value={info.value} onChange={info.onChange} />

  const {clear: clearContent, ...restContent} = content;
  const {clear: clearAuthor, ...restAuthor} = author;
  const {clear: clearInfo, ...restInfo} = info;

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...restContent} />
        </div>
        <div>
          author
          <input {...restAuthor} />
        </div>
        <div>
          url for more info
          <input {...restInfo} />
        </div>
        <button>create</button>
      </form>
      <button onClick={clearAll}>reset</button>
      
    </div>
  )

}

const Notification = ({notif}) =>{

  if(notif!== ''){

    return(
      <div>
        {notif}
      </div>
    )

  }
  
}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)


  const match = useMatch('/anecdotes/:id') //everytime the browser changes url
  //this is executed. if the url of the browser matches /anecdotes/:id
  //it sets the match to that.

  const anec = match //if match is not null, basically the browser url matched
    ? anecdotes.find(anec => anec.id === Number(match.params.id)) //find the anec by extracting the id
    : null //else set the anec to null, since the browser url does not match and match is set to null

  const vote = (id) => {

    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notif={notification}/>

      <Routes>
      <Route path='/anecdotes/:id' element={<Anecdote anecdote={anec}/>}></Route>
      <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes}/>}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/create' element={<CreateNew addNew={addNew} setNotif={setNotification}/>}></Route>
      </Routes>

      <br></br>
      <Footer />
      
      
      
      
    </div>
  )
}

export default App