import React, { useContext,useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect , withRouter } from "react-router-dom"
import Feedback from '../Feedback'

import './index.sass'


function Login({history}) {
    const[error,setError]=useState(undefined)
   
    const { setView,view } = useContext(Context)
    
    function handleSubmit(event) {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {
            await logic.authenticateUser(email, password)         
            setView('landing')
            history.push("/")
            
        } catch(error) {
            setError(error.message)
        }
    }

    return <>
       
        
        <h2 className="formPanel">Login</h2>
        <hr></hr>
        <div className="formPanel-form">
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" name="email" ></input>
                <label>Password:</label>
                <input type="password" name="password" ></input>
                <button className="formPanel-submit">Submit</button>
            </form>
            <a href='/#/' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left backArrow"></i></a>

        </div>
        <hr></hr>
        {error!=undefined && <Feedback message={error} />} 
        
    </>
}

export default withRouter(Login)

