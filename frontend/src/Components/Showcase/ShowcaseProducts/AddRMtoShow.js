import React,{useState} from "react";
import ReadymadeProducts from "../../readyMadeProducts/readyMadeProducts";
import AdminSideBar from "../../Admin/AdminComponents/AdminSideBar";

export default function AddRMtoShow(){

const isAdd=true;
console.log(isAdd);

return(

<div >
    
<ReadymadeProducts isadd={isAdd}></ReadymadeProducts>

</div>

)


}