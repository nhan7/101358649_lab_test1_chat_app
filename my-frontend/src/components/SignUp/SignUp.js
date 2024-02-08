import React, {useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

function SignUp(){


    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password:''
        // confirmPassword:''

    })
    

    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const creds = new FormData(e.currentTarget)
        const data ={
            username: creds.get('username'),
            firstName: creds.get('firstName'),
            lastName:creds.get('lastName'),
            password: creds.get('password')
        };

        if(data.password === creds.get('confirmPassword')){
            console.log(data)
          }
      
      
          axios.post("http://localhost:3004/api/v1/user/signup", data)
            .then((response) => {
              if(response.status){
                setRegistrationSuccess(true);
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log('Server responded with:', error.response.status);
                console.log('Error data:', error.response.data);
              } else if (error.request) {
                console.log('No response received:', error.request);
              } else {
                console.log('Error during request setup:', error.message);
              }
             })
    }
    return(
        <div style={{textAlign:'center'}}>
            <div>
                <h2>User Registration</h2>
            </div>  
            <form onSubmit={handleSubmit} >
                <div>
                <label className="label">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required/>
                </div>
                <div>
                <label className="label">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/>
                </div>
                
                <div>
                <label className="label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                </div>
                <div>
                <label className="label">Password</label>
              
                <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                </div>
                <div>
                <label className="label">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>

            </form>
            <Link to="*">
            <button type="submit">Go back to home</button>

            
            </Link>
            

        </div>
    )
}

export default SignUp