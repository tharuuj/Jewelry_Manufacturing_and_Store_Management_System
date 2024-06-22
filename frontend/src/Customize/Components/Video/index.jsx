import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "../../../Components/Accsesories/Head&Foot/Header";

const Video = () => {

const [value, setValue] = useState();

const navigate = useNavigate();

const handleJoinRoom = useCallback(() => { navigate(`/room/${value}`)

}, [navigate, value])

return (

    <div>
       <Header/>
      <br></br>
      <h2 style={{ fontSize: "40px" }}>Connect with our agent </h2>

      <br></br>
     
    
    <input
    
    value={value}
    
    onChange={(e) => setValue(e.target.value)}
    
    type="text" 
    
    placeholder="Enter Room Code"
    
    />
    
    <button onClick={handleJoinRoom}>Join</button>
    
    </div>
);
};
export default Video;