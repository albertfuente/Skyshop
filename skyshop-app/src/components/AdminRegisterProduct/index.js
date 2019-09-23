/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import './index.sass'

function AdminRegisterProduct() {
    
    const { setView , admin, view} = useContext(Context)
    let productId=""

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: { value: title }, image: { files: [image] }, description: { value: description }, size: { value: size },color: { value: color },price: { value: price } } } = event    
        handleRegisterProduct(title,image,description,size,color,(parseInt(price)))
    }
    
    async function handleRegisterProduct(title,image,description,size,color,price) {
    
          try {         
              const response= await logic.registerProduct(title,image,description,size,color,price)
              productId=response.id
              await logic.uploadPhoto(productId,image)
              setView("productSuccess")
          } catch(error) {
              console.log(error.message)
          }
      } 
    
    return <>
        {view==="productSuccess" && <Redirect to="/admin/success"/>}
        <h2 className="formPanel">Register products</h2>
        <hr></hr>
        {admin===true &&
        <div className="formPanel-form">
        <form enctype="multipath/form-data" onSubmit={handleSubmit} >
            <label>Title:</label>
            <input type="text" name="title" ></input>
            <label>Image:</label>
            <input type="file" name="image" ></input>
            <label>Description:</label>
            <input type="text" name="description" ></input>
            <label>Size:</label>
            <input type="array" name="size" ></input>
            <label>Color:</label>
            <input type="text" name="color" ></input>
            <label>Price:</label>
            <input type="number" name="price" ></input>
            <button className="formPanel-submit">Submit</button>
        </form>
        <a href='/#/admin'><i className="far fa-2x fa-arrow-alt-circle-left backArrow"></i></a>
    </div>
        }       
    </>
}

export default AdminRegisterProduct