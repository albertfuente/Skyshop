import React, { useContext } from 'react'
import Context from '../Context'
import './index.sass'

function ProductUpdateSuccess() {
    const { setView,view } = useContext(Context)
    setView("none")

    return <>
        <p className="formPanel">You have been succesfully updated a product</p>            
        <a href='/#/admin' className="formPanel-submit-explore" >Go back to admin site</a>               
    </>
}

export default ProductUpdateSuccess