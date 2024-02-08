import React from 'react'
import {useLocation} from 'react-router-dom'
function Chat(){
    const location = useLocation()
    const username = location.state.username
    return(
        <div>
            <h1>Chat App</h1>
            <h4>Welcome, {username}</h4>
            

        </div>
    )
}

export default Chat