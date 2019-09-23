/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import './index.sass'

function RegisterSuccess() {
       
    return <>
        <p className="formPanel">You have been succesfully registered, continue to:</p>  
        <a href='/#/login' className="formPanel-submit-explore" >Login</a>
        
        
    </>
}

export default RegisterSuccess