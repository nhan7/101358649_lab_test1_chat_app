import React from 'react'
import {useLocation} from 'react-router-dom'
import io from 'socket.io-client';
import {useState, useEffect} from 'react';
function Chat(){
    const location = useLocation()
    const username = location.state.username

    const [socketID, setSocketID] = useState('')
    const [group, setGroup] = useState('')
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])

    const ioClient = io('http://localhost:3004', {
       transports: ['websocket']
    });

    useEffect(()=>{
        ioClient.on('connect', () =>{
            setSocketID(ioClient.id);
            console.log('Connected')
            ioClient.emit('say_hello', "How are you all?")
        })
        ioClient.on('chat_message', (data)=>{
            console.log(`Chat: ${data}`)
            setChatHistory(prev =>[...prev, data])
        })
        ioClient.on('group_message_client', (gmsg)=>{
            console.log(gmsg)
        })
       
        ioClient.on('disconnect',()=>{
            console.log('disconnected')
        })
        return() => {
            ioClient.disconnect();
        }
    }, [ioClient])

    const sendGroupMessage = () =>{
        ioClient.emit('group_message', {group, message})
    }

    const joinGroup = () =>{
        ioClient.emit('join_group', group)

    }
    const leaveGroup = () =>{
        ioClient.emit('leave_group', group)
    }
    return(
        <div>
            <h1>Chat App</h1>
            <h4>Welcome, {username}</h4>
            <select id="group" name="group" value={group} onChange={(e)=> setGroup(e.target.value)}>

                <option value="DevOps">DevOps</option>
                <option value="CloudComputing">Cloud Computing</option>
                <option value="Covid">Covid19</option>
                <option value="Sports">Sports</option>

            </select>
           
            <button onClick={joinGroup}>Join group</button><br />

            <input type="text" id="message" name="message" placeholder="Send a message..." value={message} onChange={(e)=> setMessage(e.target.value)}/>
            <button onClick= {sendGroupMessage}>Send</button>

            <h3>Chat history</h3>
            <div id="container">
            {chatHistory.map((msg, index)=>{
                <p key={index}>{msg}</p>
            })}
            </div>
            <button onClick={leaveGroup}>Leave</button>

            
            
            

        </div>
    )
}



export default Chat