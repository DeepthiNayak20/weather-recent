import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// const favItem = JSON.parse(localStorage.getItem('fav') || '[]')

export interface CounterState {
  value: any
  favalues: any
}

const initialState: CounterState = {
  value: [],
  favalues: JSON.parse(localStorage.getItem('fav') || '[]'),
}

export const weatherSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    weather: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
    addFavalue: (state, { payload }) => {
      // if (state.favalues.location.woeid !== payload.location.woeid) {
      // console.log('abvcxz', location.location.woeid)

      // }

      state.favalues.push(payload)

      localStorage.setItem('fav', JSON.stringify(state.favalues))
      window.location.reload()
    },
    removeSlice: (state: any, { location }: any) => {
      const favourites = JSON.parse(localStorage.getItem('fav') || '[]')
      // console.log('woeid', favourites)
      let remId = -1
      for (let i = 0; i < favourites.length; i++) {
        // console.log('id', favourites[i].location.woeid, location.location.woeid)
        if (
          (favourites[i] &&
            favourites[i].location &&
            favourites[i].location.woeid) ===
          (location && location.location && location.location.woeid)
        ) {
          remId = i
        }
      }
      console.log('remId', remId)
      favourites.splice(remId, 1)
      console.log('new remId', favourites)
      localStorage.setItem('fav', JSON.stringify(favourites))
    },
    // removeSlice: (state: any, { payload }: any) => {
    //   console.log('fav', state)

    //   const removeItem = state.favalues.filter((item: any) => {
    //     console.log('data', item.location.woeid, payload.location.woeid)

    //     if (item.location.woeid === payload.location.woeid) {
    //       alert('found')
    //     }

    //     return item.location.woeid !== payload.location.woeid
    //   })
    //   console.log(payload.location.woeid)

    //   state.favalues = removeItem
    //   console.log('removeItem', removeItem)

    //   localStorage.setItem('fav', JSON.stringify(state.favalues))
    //   window.location.reload()
    // },
  },
})

// Action creators are generated for each case reducer function
export const { weather, addFavalue } = weatherSlice.actions

export default weatherSlice
