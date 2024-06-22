import React,{useState,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { signout } from "../actions";
import { isUserLoggedIn } from "../actions";
import { useNavigate } from "react-router-dom";

export default function User(){

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const auth = useSelector((state) => state.auth);
    const logout = () => {
        dispatch(signout());
        navigate('/');

      };
    
    useEffect(() => {
       
        
      }, []);
   
       
    return(

        <div>
USERRRRRRRRRRRRRRR

<button onClick={ logout}>Log out</button>
{user?<h1>{user.name}</h1>:null}

        </div>
    )
}