import * as React from 'react'
import {Link} from "react-router-dom"
const BUtton = {
    color:"White",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily:"Sans-Serif"
}
function Home(){
    return(
        <div style={{textAlign:'center'}} >
            <h2>Welcome to the chatapp</h2>
            <Link to="Login">
            <button style={BUtton}type="button">Login</button>
            </Link>
            <Link to="SignUp">
            <button style={BUtton}type="button">Sign up</button>
            </Link>


        </div>

    )


}

export default Home