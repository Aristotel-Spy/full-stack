import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
    reducer:{

        notif:notifReducer,
        blogs:blogReducer,
        user:userReducer,
        users:usersReducer

    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
<Router>
    <Provider  store={store} >
    <App/>
    </Provider>
</Router>
)