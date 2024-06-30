import { configureStore } from '@reduxjs/toolkit'

import Anecreducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'


const store = configureStore({
    reducer:{
      anecs:Anecreducer,
      filter:filterReducer,
      notif:notificationReducer
      
    }
  })

export default store
  