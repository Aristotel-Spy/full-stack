import { Link } from "react-router-dom"


const Users = ({users}) =>{

    return(
        <div>
            <h1>Users</h1>

            {users.map(user=>{
                return(
                    <div key={user.id}>

                        <Link to={`/users/${user.id}`}>{user.name}</Link> blogs created: 
                          
                         <strong> {user.blogs.length}</strong> 

                    </div>
                )
            })}

        </div>
    )


}

export default Users