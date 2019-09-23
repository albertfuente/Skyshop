import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import Feedback from '../Feedback'
import './index.sass'


function ShowAllOrdersUser() {
  const[error,setError]=useState(undefined)
  let total=0
  
    const { user, orders,setOrders} = useContext(Context)

    useEffect(() => {    
          (async ()=> {
            try {              
              const orderId = await logic.retrieveAllOrdersUser()
              if(!orderId) {
                setOrders(undefined)      
              }
              setOrders(orderId)      
              setError(undefined)                 
              console.log('is order? '+orderId)
            } catch(error) {
              setError(error.message)
              console.log(error.message)              
            }
          }
          )()      
    }, [])

 

    return <>
    {user &&
    <div>
      
   <h4>History of orders:</h4>
         {error!=undefined && <Feedback message={error} />} 

    {orders &&
            <ul>
                 {orders.map(item=> {
                   return<>
                    <ul className='orders' >
                    <label className="orders-label">STATE:</label>
                    <li className="">{item.state[0]}</li>
                    <label className="orders-label">DATE:</label>
                    <li className="">{item.date.slice(0,16)}</li>
                    <label className="orders-label">ITEMS:</label>
                    <ul className='orders'>
                      {item.items.map(prod=>{
                        return<>
                        <li>{"Product: "+prod.product.title}</li>
                        <li>{"Description: "+prod.product.description}</li>
                        <li>{"Price: "+prod.product.price}</li>
                        <li>{"Quantity: "+prod.quantity}</li>
                        <hr></hr>
                        </>
                      })}
                    </ul>
                    <li className="userCart-hidden">{item.items.map(prod=> 'Total: '+(total+=(prod.product.price*prod.quantity))+ " €")}</li>  
                    <p>{"Total: "+total+ " €"}</p>
                    <p className="userCart-hidden">{total=0}</p>
       

                    </ul>
                   </>
                 }
                 
                  )} 
                  <a href='/#/profile'><i className="far fa-2x fa-arrow-alt-circle-left backArrow"></i></a>

            </ul> 
            
    }     

    </div>
    

    }
    </>
}

export default ShowAllOrdersUser