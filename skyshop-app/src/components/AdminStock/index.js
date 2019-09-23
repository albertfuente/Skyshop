import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import './index.sass'

function Stock() {
    
    const { view, orders,setOrders} = useContext(Context)
    let tshirts=0
    let ducks=0
    let mugs=0
    let pigs=0
    let fullequip=0
    let framefirst=0
    let frametrek=0
    let carlos=0
    let mentors=0
    let nocillas=0

    useEffect(() => {     
          (async ()=> {
            try {
              const orderId = await logic.retrieveAllOrders()
              setOrders(orderId)           
              console.log('is order? '+orderId)
            } catch(error) {
              console.log(error.message)          
            }
          })()   
    }, [])


    return <>
    {view==="productDetail" && <Redirect to="/productDetail"/>}
    <h4 className="stock">Pending Stock:</h4>
    {orders &&   
            <ul>
                 {orders.map(item=> {
                   return<>
                    <ul className='orders' >
                    <label className="orders-label">ITEMS:</label>
                    <li className="">{item.items.map(prod=>"Product: "+prod.product.title+ ", Price: " + prod.product.price + ", Quantity: \n"+prod.quantity + "    ")}</li>
                    </ul>
                   </>
                   
                 }
                 
                  )} 
            </ul>            
    } 
    {orders &&
    orders.map(item=>{
        item.items.filter(prod=>{    
        if(prod.product.title==="T-shirt") tshirts+=parseInt(prod.quantity)
        if(prod.product.title==="Duck") ducks+=parseInt(prod.quantity)
        if(prod.product.title==="Pig") pigs+=parseInt(prod.quantity)
        if(prod.product.title==="Full equip") fullequip+=parseInt(prod.quantity)
        if(prod.product.title==="Mug") mugs+=parseInt(prod.quantity)
        if(prod.product.title==="Frame First") framefirst+=parseInt(prod.quantity)
        if(prod.product.title==="Frame Trek") frametrek+=parseInt(prod.quantity)
        if(prod.product.title==="Carlos") carlos+=parseInt(prod.quantity)
        if(prod.product.title==="Nocilla") nocillas+=parseInt(prod.quantity)
        if(prod.product.title==="Mentors") mentors+=parseInt(prod.quantity)




    })})} 
        <h4 className="stock"> Needed stock for thsirts: {tshirts}</h4>
        <h4 className="stock"> Needed stock for ducks: {ducks}</h4>
        <h4 className="stock"> Needed stock for mugs: {mugs}</h4>
        <h4 className="stock"> Needed stock for pigs: {pigs}</h4>

        <h4 className="stock"> Needed stock for full equip: {fullequip}</h4>
        <h4 className="stock"> Needed stock for Frame first: {framefirst}</h4>
        <h4 className="stock"> Needed stock for Frame trek: {frametrek}</h4>
        <h4 className="stock"> Needed stock for Carlos: {carlos}</h4>
        <h4 className="stock"> Needed stock for Nocilla: {nocillas}</h4>
        <h4 className="stock"> Needed stock for Mentors: {mentors}</h4>




        <a href='/#/admin' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left backArrow"></i></a>

    </>
}

export default Stock