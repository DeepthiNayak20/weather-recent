import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favItem: JSON.parse(localStorage.getItem('fav') || '[]'),
}

export const iconSlice = createSlice({
  name: 'iconStatus',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = iconSlice.actions

export default iconSlice
