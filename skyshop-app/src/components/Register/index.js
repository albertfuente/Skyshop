import React, { useContext, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import Feedback from '../Feedback'
import './index.sass'

function Register() {
    const[error,setError]=useState(undefined)
    
    const { setView,view } = useContext(Context)

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        handleRegister(name, surname, email, password)
    }
    
    async function handleRegister(name, surname, email, password) {
        console.log("error",error)
    
          try {
              await logic.registerUser(name, surname, email, password)
              setView('registerSuccess')
              setError(undefined)
             
          } catch(error) {
              setError(error.message)
              console.log("error",error.message)
          }
      }
    
    return (
     <>
        
         {view==="registerSuccess" && <Redirect to="/registersuccess"/>}
        <h2 className="formPanel">Register</h2>
        <hr></hr>
        <div className="formPanel-form">
            <form  onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" ></input>
                <label>Surname:</label>
                <input type="text" name="surname" ></input>
                <label>Email:</label>
                <input type="email" name="email" ></input>
                <label>Password:</label>
                <input type="password" name="password" ></input>
                <button className="formPanel-submit">Submit</button>
            </form>
            <a href='/#/' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left backArrow"></i></a>
        </div>
        {error!=undefined && <Feedback message={error} />} 
       
    </>
    )
}

export default Register