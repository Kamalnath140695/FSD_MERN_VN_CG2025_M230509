import { useState } from "react";


const UserNameField=()=>{

      const [text, setText] = useState("");

    return <>
    <label>UserName:</label>
    <input type="name" onChange={(e)=> setText(e.target.value)}></input>
    <h2> Your typed: {text}</h2>
    </>
}


export default UserNameField