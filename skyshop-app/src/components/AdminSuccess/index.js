import React, { useContext } from 'react'
import Context from '../Context'
import './index.sass'

function ProductSuccess() {
    const { setView,view } = useContext(Context)
    setView("none")

    return <>
        <p className="formPanel">You have been succesfully registered a product</p>            
        <a href='/#/admin/register-products' className="formPanel-submit-explore" >Register more products</a>               
    </>
}

export default ProductSuccess