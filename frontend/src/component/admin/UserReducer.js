export const loginUserReducer= (state = {}, action)=>{
switch (action.type){
  case "USER_LOGIN_REQUEST":
      return{
          loading:true,
      };
  case "USER_LOGIN_SUCCESS":
      return{
          success: true,
          loading: false,
          currentusers: action.payload,
      };
  case "USER_LOGIN_FAIL":
      return{
          error: action.payload,
          loading:false,
      };
  default:
      return state; 
 }
};
 