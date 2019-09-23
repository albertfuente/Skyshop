/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext , useEffect} from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import './index.sass'

function UpdateSelectedProduct() {
    
    const { setView , admin, view, product, productQuery, setProductQuery,setProduct } = useContext(Context)

    useEffect(() => {
        (async () =>{
          try{
            const product=await logic.retrieveProduct(productQuery)    
            setProduct(product)
          }catch(error){
            console.log(error.message)
          }
        })()       
      },[])

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: { value: title }, image: { files: [image] }, description: { value: description }, size: { value: size },color: { value: color },price: { value: price } } } = event
        const body={
            title,       
            description,
            size,
            color,
            price
        }
        handleUpdateProduct(productQuery,body, image)
    }
    
    async function handleUpdateProduct(productQuery,body, image) { 
          try {
              const response= await logic.updateProduct(productQuery,body)
              console.log("PRODUCT UPDATED")  
              if(image){
                await logic.uploadPhoto(productQuery,image)
                console.log('picture uploaded')       
              }
              setView("success")                        
          } catch(error) {
              console.log(error.message)
          }
      } 
    return <>
        {view==="success" && <Redirect to="/admin/update-selected/success"/>}
        {view==="select" && <Redirect to="/admin"/>}

        <h2 className="formPanel">{'Update product:'}</h2>
        <hr></hr>
        {admin===true && product &&
        <div className="formPanel-form">
        <form enctype="multipath/form-data" onSubmit={handleSubmit} >
            <label>{`Previous title: ` +product.title}</label>
            <br></br>
            <label>{`New title: `}</label>
            <input type="text" name="title" ></input>
            <label>{`Previous image: ` +product.image}</label>
            <br></br>
            <label>{`New image: `}</label>
            <input type="file" name="image" ></input>
            <label>{`Previous description: ` +product.description}</label>
            <br></br>
            <label>{`New description: `}</label>
            <input type="text" name="description" ></input>
            <label>{`Previous size: ` +product.size}</label>
            <br></br>
            <label>{`New size: `}</label>
            <input type="array" name="size" ></input>
            <label>{`Previous color: ` +product.color}</label>
            <br></br>
            <label>{`New color: `}</label>
            <input type="text" name="color" ></input>
            <label>{`Previous price: ` +product.price}</label>
            <br></br>
            <label>{`New price: `}</label>
            <input type="number" name="price" ></input>
            <button className="formPanel-submit">Submit</button>
        </form>


    </div>
        }
        <button className="formPanel-reject" onClick={event => {
        event.preventDefault()
        setView('select')
        setProductQuery(undefined)
    }}>Cancel update product</button>
        
        
    </>
}

export default UpdateSelectedProduct