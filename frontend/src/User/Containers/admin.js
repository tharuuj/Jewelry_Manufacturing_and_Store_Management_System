import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { signout } from "../actions";
import { useNavigate } from "react-router-dom";
export default function Admin(){
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const logout = () => {
        dispatch(signout());
        navigate('/');

      };

    return(

        <div>
Adminnnnn
<button onClick={logout}>Log out</button>

        </div>
    )
}