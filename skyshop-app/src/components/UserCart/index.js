import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import './index.sass'

function UserCart() {
  const { cart, setCart,setView,view, setFromCart,fromCart } = useContext(Context)
  let total=0
  let lengthcart

  useEffect(() => {
    (async () => {
      try {
        const cart = await logic.retrieveCart()
        setCart(cart)
        
        lengthcart=cart.length
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [cart])

  async function handleUpdateCart(productId) {
    try {
      await logic.updateCart(productId)
    } catch (error) {
      console.log("error", error.message)
    }
  }

  function handleCheckout(event) {
    event.preventDefault()
    handlePlaceOrder()
  }
  async function handlePlaceOrder() {

    try {
      await logic.placeOrder()
      setView("success")
      setFromCart(true)
    } catch (error) {
      console.log(error.message)
    }
  }


  return <>

            {cart=="" || cart==undefined &&
            <div>
            <p className="formPanel">Cart is empty</p>
            
            </div>
          }
    {view==="success" && <Redirect to="/profile/success"/>}
    {cart && cart instanceof Array &&
      <div>
        <ul>
          {cart.map(item => {
            return <>
              <ul className='userCart'>
                <li onClick={event => {
                  event.preventDefault()
                  
                  let productId = item.product._id
                  handleUpdateCart(productId)
                }}><i class="far fa-times-circle"></i></li>
                <li className="userCart-title">{item.product.title}</li>
                <li className="userCart-description"><img src={item.product.image}/></li>
                <li className="userCart-description">{'Size: ' + item.product.size}</li>
                <li className="userCart-description">{'Color:' + item.product.size}</li>
                <li className="userCart-description">{'Price:' + item.product.price + " €"}</li>
                <li className="userCart-description">{'Quantity: ' + item.quantity}</li>
                <li className="userCart-hidden">{'Total: '+(total+=(item.product.price*item.quantity))+ " €"}</li>         
              </ul>
            </>
          }
          )}
        </ul>
        {cart!=""&& cart!=undefined &&<h3 className="userCart-total">Total: {total + " €"}</h3>}
        

        {cart!=""&& cart!=undefined && <button className="formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>}
        <p><a href="/#/"><i className="far fa-2x fa-arrow-alt-circle-left userCart-backArrow"></i></a></p>

      </div>
    }
  </>
}

export default UserCart