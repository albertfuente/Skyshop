import React, { useContext } from 'react'
import Context from '../Context'
import { Redirect} from "react-router-dom"
import './index.sass'


function User() {
    
    const { setView, setCredentials, view,setUser } = useContext(Context)
 
    return <>
            {view==="redirectLanding" && <Redirect to="/landing"/>}

        <h2 className="formPanel">User</h2>
        <nav>
        <ul >
            <li ><a className="nav-but2" href='/#/profile/user-orders'> View orders</a></li>
            <li ><a className="nav-but2" href='/#/profile/user-update'> Update profile</a></li>
            <li ><a className="nav-but2" onClick={event => {
                event.preventDefault()  
                setCredentials(undefined)
                setView("redirectLanding")
                setUser(undefined)
                sessionStorage.clear()
            }}> Log out</a></li>
             <li ><a className="nav-but2" href='/#/profile/user-remove' > Remove profile</a></li>

        </ul> 
        </nav>
        
    </>
}

export default User