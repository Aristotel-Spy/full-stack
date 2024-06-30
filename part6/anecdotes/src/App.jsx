import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/Anecdoteform'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecServices from './services/anecdote'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(initializeAnecdotes())
    //anecServices.getAll().then(anecs =>
     // dispatch(setAnecdotes(anecs))
    //)

  },[])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App