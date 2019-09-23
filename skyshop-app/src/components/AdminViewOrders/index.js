import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import './index.sass'

function ShowAllOrders() {
    
    const { view, orders,setOrders} = useContext(Context)

    useEffect(() => {   
          (async ()=> {
            try {
              const orderId = await logic.retrieveAllOrders()

              setOrders(orderId)           
            } catch(error) {
             
            }
          })()
             
    }, [])

    return <>
    {view==="productDetail" && <Redirect to="/productDetail"/>}
    <h4>All orders:</h4>
    {orders &&
            <ul>
                 {orders.map(item=> {
                   return<>
                    <ul className='orders' >
                    <label className="orders-label">STATE:</label>
                    <li className="">{item.state[0]}</li>
                    <label className="orders-label">DATE:</label>
                    <li className="">{item.date.slice(0,16)}</li>
                    <label className="orders-label">OWNER:</label>
                    <li className="">{item.owner.name}</li>
                    <label className="orders-label">ITEMS:</label>

                    <ul className='orders'>
                      {item.items.map(prod=>{
                        return<>
                        <li>{"Product: "+prod.product.title}</li>
                        <li>{"Price: "+prod.product.price}</li>
                        <li>{"Quantity: "+prod.quantity}</li>
                        <hr></hr>

                        </>
                      })}
                    </ul>

                    </ul>
                   </>
                 }
                 
                  )} 
                  <a href='/#/admin' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left  backArrow"></i></a>

            </ul> 
            
    }     
    </>
}

export default ShowAllOrders