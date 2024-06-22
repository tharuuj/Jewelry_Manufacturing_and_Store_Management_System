import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Header from "../../../Components/Accsesories/Head&Foot/Header";

const RoomPage = () => {
const { roomId} = useParams();

const myMeeting = async (element) =>{

const appID=2115379868;
const serverSecret = "5468f4b58126d1d14fbd44b2a2d7359c";
const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "kanjana" );

const zc = ZegoUIKitPrebuilt.create(kitToken);
zc.joinRoom({container: element,
             sharedLinks: [
                {
                  name: "Copy Link",
                  url: `http://localhost:3000/room/${roomId}`,
                },
        
            ],
             scenario: {mode:ZegoUIKitPrebuilt.OneONoneCall,},
             screenSharingConfig: false})
};
return (
<div>
<Header />
<br></br>
      <br></br>
      <h3 style={{ fontSize: "40px" }}>Get in touch with our agent to customize the jewelry you want</h3>

      <br></br>
      <br></br>
      <p>"Connect with our dedicated agent to craft your dream jewelry piece with a personalized touch. Whether it's a unique design, a special engraving, or selecting the perfect gemstones, our agent will work closely with you to bring your vision to life. Experience the luxury of tailored jewelry that reflects your individual style and personality. Our agent will take the time to truly understand your preferences, lifestyle, and the significance behind the piece you want to create. Through in-depth discussions and attentive listening, they'll ensure every detail reflects your vision. Together, you and our agent will explore various design possibilities. Whether you have a specific idea in mind or need inspiration, our agent will provide expert guidance to refine your concept and bring out its full potential."</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
     <div ref={myMeeting} />
</div>
);
};

export default RoomPage;