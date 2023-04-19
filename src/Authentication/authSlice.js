import { createSlice } from '@reduxjs/toolkit'
import { authSliceType } from './type';

// const initialState = {
//   loading: false,
//   userInfo: {},       //for user obj
//   userToken: null,    //for storing the JWT
//   error: null,        
//   success: false,     //for monitoring the registration process
// }

// const userSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: {},
// })

// export default authSlice.reducer

const initialState = {
  loading: false,
  userInfo: {},       //for user obj
  userToken: null,    //for storing the JWT
  error: null,        
  success: false,     //for monitoring the registration process
}

const authSlice = (state = initialState, action = {}) => {
  const payload = action.payload;
  switch(action.type) {
    case authSliceType.TET:
      return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}

export default authSlice;



