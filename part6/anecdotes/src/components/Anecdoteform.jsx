import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { likeNotif } from "../reducers/notificationReducer"
import { resetNotif } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdote"

import { notify } from "../reducers/notificationReducer"

const AnecdoteForm = () =>{

    const dispatch = useDispatch()

    const submitAnec = async (e) =>{
        
        e.preventDefault()

        const content = e.target.anec.value

        e.target.anec.value = ""

        //const createdAnec = await anecdoteService.createNew(content)

        //dispatch(likeNotif(`you added ${content}`))

        dispatch(notify(`you added ${content}`,5))

        dispatch(createAnecdote(content))

        //setTimeout(()=>{

        //    dispatch(resetNotif())

       // },5000)


    }

    return(
        <div>
        <h2>create new</h2>
        <form onSubmit={submitAnec}>
            <input name="anec"/>
            <button type="submit">submit</button>
        </form>
        </div>
    )

}

export default AnecdoteForm