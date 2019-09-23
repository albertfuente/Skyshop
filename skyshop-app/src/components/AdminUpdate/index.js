import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import './index.sass'

function AdminUpdate() {

    const { setView , credentials, admin} = useContext(Context)
    const { id, token } = credentials

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        const body = {
            name,
            surname,
            email,
            password,
        }
        handleUpdate(id,token,body)
    }
    
    async function handleUpdate(id, token,body) {       
          try {
              await logic.updateUser(id, token, body)
              setView('registerSuccess')
             
              console.log("user is updated")
          } catch(error) {
              console.log(error.message)
          }
      }
    
    return <>
        <h2 className="formPanel">Update</h2>
        <hr></hr>
        {admin===true &&
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
                <a href='/#/admin' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left backArrow"></i></a>
            </div>  
        }
  
    </>
}

export default AdminUpdate