/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import './index.sass'

function Cart() {
    
    const { setView, credentials, user } = useContext(Context)
   
    return <>
    <section>
    {user &&
        <div>
             <h2 className="formPanel">Cart</h2> 
        <div className="formPanel-form">
        <p>Your shopping cart is empty</p>
        <a href="#" onClick={event => {
            event.preventDefault()
            setView('landing')
        }}><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>

    </div>
        </div>     
    }
        {!user &&
        <h2 className="formPanel">In order to shop please <a href="/#/login" className="formPanel-submit">log in</a> or <a href="/#/register" className="formPanel-submit">register</a></h2>
        }

    </section>     
    </>
}

export default Cart