import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
    name: 'notif',
    initialState:"",
    reducers: {
  
      blogAddNotif(state, action) {
  
        const notification = action.payload

        return notification
  
      },

      
      resetNotif(state,action){

        return ''

      }
  
    },
  })

export const { blogAddNotif, resetNotif } = notifSlice.actions
export default notifSlice.reducer