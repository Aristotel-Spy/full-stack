import { createSlice } from '@reduxjs/toolkit'


const notifSlice = createSlice({
    name: 'notif',
    initialState:"",
    reducers: {
  
      likeNotif(state, action) {
  
        const notification = action.payload

        return notification
  
      },

      
      resetNotif(state,action){

        return ''

      }
  
    },
  })
  
    //action creator for filtering
    //the filter parameter is set from the App.jsx
    
    
  export const { likeNotif,addNotif,resetNotif } = notifSlice.actions

  export const notify = (content,seconds) => {
    return dispatch => {

      dispatch(likeNotif(content))

      setTimeout(() => {
        dispatch(resetNotif());
      }, seconds*1000);  

      
    }
  }

  export default notifSlice.reducer