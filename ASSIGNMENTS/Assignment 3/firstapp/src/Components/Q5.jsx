import { useState } from "react"

const Form=()=>
{

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    return (
        <div className="form" style={{margin:15,padding:10,alignItems:'top'}}>
            <label>UserName: <input type="text" placeholder="Enter the username" onChange={(e)=>setName(e.target.value)}></input></label><br/>
            <label>Email: <input type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}></input></label><br/>
            <button type="submit">Submit</button>
            <h1> Your name is : {name}</h1>
            <h3>Your email id is: {email}</h3>
        </div>
    )
}

export default Form