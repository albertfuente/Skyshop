import React, { useContext } from 'react'
import Context from '../Context'
import { Redirect} from "react-router-dom"
import './index.sass'

function Admin() {
    
    const { setView,view,setCredentials,admin,setUser,setAdmin } = useContext(Context)

    function handleGoRegisterProduct(event){
        event.preventDefault()
        setView("registerProducts")
        console.log("got to register product")
    }
 
    return <>
        {view==="redirectLanding" && <Redirect to="/landing"/>}
        <h2 className="formPanel">Admin</h2>
        {admin===true &&
        <nav>
        <ul >
            <li ><a className="nav-but2" href='/#/admin/register-products'> Register products</a></li>
            <li ><a className="nav-but2" href='/#/admin/update-product'> Update product</a></li>
            <li ><a className="nav-but2" href='/#/admin/remove-product'> Remove product</a></li>
            <li ><a className="nav-but2" href='/#/admin/stock'> Stock control</a></li>
            <li ><a className="nav-but2" href='/#/admin/view-orders'> View orders</a></li>
            <li ><a className="nav-but2" onClick={event => {
                event.preventDefault()  
                setCredentials(undefined)
                setView("redirectLanding")
                setUser(undefined)
                setAdmin("")
                sessionStorage.clear()
                //setUser()
                console.log("no credentials")
            }}> Log out</a></li>
        </ul> 
        </nav>}
        
    </>
}

export default Admin