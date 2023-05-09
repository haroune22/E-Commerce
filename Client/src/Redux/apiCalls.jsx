import { publicRequest } from "../RequestMethods";
import { loginFailure, loginStart, loginSuccess } from "./UserSlice"

export const login = async(dispatch,user)=>{
dispatch(loginStart());
try {
    const res =await publicRequest.post("/auth/login",user)
    dispatch(loginSuccess(res.data))
} catch  {
    dispatch(loginFailure())
}
}