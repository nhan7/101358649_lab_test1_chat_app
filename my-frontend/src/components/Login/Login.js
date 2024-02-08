import React, {useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
function Login(){
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const creds = new FormData(e.currentTarget)
        const data ={
            username: creds.get('username'),
            password: creds.get('password')
        }

        axios.post("http://localhost:3004/api/v1/user/login", data)
        .then((response) =>{
            console.log(response)
            if(response.status === 200){
                navigate("/Chat")
            }
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div>
            <h2>Login</h2>
            <div>
                <form onSubmit={handleSubmit}>


                    <div>
                    <label className="label">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}   required/>
                    </div>
                    <div>
                    <label className="label">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                    </div>
                    <div>
                    <button type="submit">Login</button>
                    </div>
                </form>
                
            </div>
           
            <Link to="*">
            <button type="submit">Go back to home</button>
            </Link>
        </div>
        
    )
}

export default Login