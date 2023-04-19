import { authType } from '../types/authType';

const initialState = {
  loading: false,
  user: {},       //for user obj
  userToken: null,    //for storing the JWT
  error: null,        
  success: false,     //for monitoring the registration process
}

const authReducer = (state = initialState, action = {}) => {
  const payload = action.payload;
  switch(action.type) {
 

    case authType.LOGIN_REQUEST:
      return {
          //auth logic
      };

    case authType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.jwt,
        user: action.payload.user,
      };


    case authType.LOGIN_FAIL:
    return {
      ...state,
      loading: false,
      token: action.payload.jwt,
      user: action.payload.user,
    };



    case authType.REGISTER_REQUEST:
      return {
          //auth logic
      };

    case authType.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.jwt,
        user: action.payload.user,
      };

    case authType.REGISTER_FAIL:
    return {
      ...state,
      loading: false,
      token: action.payload.jwt,
      user: action.payload.user,
    };


    default:
      return {
        ...state
      }
  }
}

export default authReducer;