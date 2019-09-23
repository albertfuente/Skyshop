/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect,useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import './index.sass'

function Auctions() {
  let value1="cheap"
  const[price,setPrice]=useState("cheap")
    
    const { user, setView, view, products, setProducts,setProductQuery } = useContext(Context)

    useEffect(() => {
        (async () =>{
          try{
            const products=await logic.retrieveAllProducts()     
            setProducts(products)
          }catch(error){
            console.log(error.message)
          }
        })()
           
  },[price])
  

    return <>
    {view==="auctionDetail" && <Redirect to="/auctions/detail"/>}
    {products && user &&
    <div>
            <h2 className="formPanel">Select a product for auction:</h2>

            <form  >
        
        <select className="select-filter" onChange={event=>{
        event.preventDefault()
        setPrice(event.target.value)
        
     }}>
           <option>Filter for:</option>
           <option value="cheap">Cheapest first</option>
           <option value="expensive">Most expensive first</option>
            </select>

           </form>
            <ul>
                 {price==="expensive" &&

                   
                  products.sort((a, b) => (a.price > b.price) ? -1 : 1).map(item=> {
                   return<>
                    <ul className='product'onClick={event => {
                event.preventDefault()
                setView("auctionDetail")
                setProductQuery(item._id)
            }} >
                  <li className="product-description">{item.title}</li>
                  <li className="product-image"><img src={item.image}/></li>
                  <li className="product-price">{item.price+" €"}</li>
                    </ul>
                   </>
                 }
                  )} 

                {price==="cheap" &&                            
                products.sort((a, b) => (a.price > b.price) ? 1 : -1).map(item=> {
                return<>
                  <ul className='product'onClick={event => {
                event.preventDefault()
                {user &&
                  setView("auctionDetail")
                setProductQuery(item._id)
                }
                {user &&
                  console.log("no user!") 
                }
                
                
                }} >
                  <li className="product-description">{item.title}</li>
                  <li className="product-image"><img src={item.image}/></li>
                  <li className="product-price2">{'Base price: '+item.price+" €"}</li>
                  </ul>
                </>
                }
                )} 
            </ul> 
            </div>
    } 
     {!user &&
        <h2 className="formPanel">In order to go to Auctions <a href="/#/login" className="formPanel-submit">log in</a> or <a href="/#/register" className="formPanel-submit">register</a></h2>
        }    
    </>
    
}

export default Auctions