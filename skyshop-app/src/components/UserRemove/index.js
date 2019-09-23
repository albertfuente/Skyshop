/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext , useState} from 'react'
import Context from '../Context'
import logic from '../../logic'
import './index.sass'

function UserRemove() {
    const[remove,setRemove]=useState(false)
    const { user,setView } = useContext(Context)

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { password: { value: password } } } = event
        handleRemove( password)
    }
    
    async function handleRemove( password) {   
          try {
              await logic.removeUser(password)
              setView('registerSuccess')
             
              console.log("user is removed")
          } catch(error) {
              console.log("error",error.message)
          }
      }

    return <>

        <h2 className="PanelRemove">Remove your profile</h2>
        {user &&<div>
        <p className="PanelRemove">Please confirm you want to remove your profile:</p>
        <ul className="PanelRemove-nav">
            <li><a className="formPanel-submit" onClick={event => {
                event.preventDefault()  
                setRemove(true)
 
            }}>Confirm</a></li>
            <li><a className="formPanel-reject" href="/#/profile">Cancel</a></li>
        </ul>
        
        </div>   
    }
    {remove && <div>
            <form>
            <form className="formPanel-form" onSubmit={handleSubmit} >
                <label>Password:</label>
                <input type="password" name="password" ></input>
                <button className="formPanel-submit-execute">Submit</button>
            </form>
            </form>
            </div>
        }
        
    </>
}

export default UserRemove