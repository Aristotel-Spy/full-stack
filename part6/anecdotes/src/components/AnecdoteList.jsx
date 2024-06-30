import { useSelector, useDispatch } from 'react-redux'
import { likeNotif } from '../reducers/notificationReducer'
import { resetNotif } from '../reducers/notificationReducer'
import { like } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


const AnecdoteList = () =>{

    const anecdotes = useSelector(state => 
        {
          return state.anecs.filter(anec=>{

            if(anec.content.toLowerCase().includes(state.filter.toLowerCase())){

              return true //which means it will return the anec object.
              //return anec works aswell because anec is truthy, so it can be interpreted as "true"
              //but it's not as good to use it like that.
             }

          }).sort((anec1,anec2) =>{

            return anec2.votes - anec1.votes
          })
        }
      )
    
    const dispatch = useDispatch()

      const vote = (id,content,anecdote) => {

        //dispatch(likeAnecdote(id))

        dispatch(like(id,anecdote))

        //dispatch(likeNotif(`you liked ${content}`))

        dispatch(notify(`you voted ${content}`,5))

        //setTimeout(()=>{

          //dispatch(resetNotif())

        //},5000)
      }
    
      return(
        <div>
            {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content,anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
      )

}

export default AnecdoteList