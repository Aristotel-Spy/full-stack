import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
    const getId = () => (100000 * Math.random()).toFixed(0)
  
  const asObject = (anecdote) => { 
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }


  const initialState = anecdotesAtStart.map(anec =>{

    return asObject(anec)
  })


  const anecSlice = createSlice({
    name: 'anecdote',
    initialState:[],
    reducers: {
  
      //createAnecdote(state, action) {
  
       // const anec = action.payload
  
        //const anec = {
        //  content:content,
        //  id:getId(),
        //  votes:0
       // }

       // state.push(anec)
  
     // },

      likeAnecdote(state,action) {

        const id = action.payload

        return state.map(anec =>{

          if(anec.id === id){

            const newAnec = {...anec,votes:anec.votes+1}

            return newAnec
          } else {
            return anec
          }
        })
      },

      setAnecdotes(state,action){

        return action.payload

      },

      addAnecdote(state,action){

        state.push(action.payload)
      }
  
    },
  })
   
  export const { likeAnecdote, setAnecdotes ,addAnecdote} = anecSlice.actions

  export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecs = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecs))
    }
  }

  export const like = (id,anec) => {

    return async dispatch =>{

      const likedAnecdote = await anecdoteService.like(id,anec)

      dispatch(likeAnecdote(likedAnecdote.id))

      
    }
  }

  export const createAnecdote = content => {
    return async dispatch => {
      const newAnec = await anecdoteService.createNew(content)
      dispatch(addAnecdote(newAnec))
    }
  }

  export default anecSlice.reducer