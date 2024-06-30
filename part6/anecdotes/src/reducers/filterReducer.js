import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState:"",
  reducers: {

    filterChange(state, action) {

      const filter = action.payload

      return filter

    },

  },
})

  //action creator for filtering
  //the filter parameter is set from the App.jsx
  
  
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer