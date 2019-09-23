/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
    
import './index.sass'

function Checkout() {
    const { setView,view,cart } = useContext(Context) 
  
    return <>    
        <div>
        <p className="formPanel">{'Thanks for shopping :)' }</p>
        <p className="formPanel">Continue shopping:</p>  
        <div>
            <a className="formPanel-submit-explore" onClick={
                event=>{
                    event.preventDefault()
                    setView('golanding')
                }
            }>Explore</a>
        </div>
        </div>
        {view==="golanding" && <Redirect to="/"/>}

        
    </>
}

export default Checkout