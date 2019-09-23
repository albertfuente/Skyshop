import React, { useContext } from 'react'
import Context from '../Context'
import './index.sass'
import { Redirect} from "react-router-dom"

function AdvancedSearch() {
    
    const { view, setView,setProductQuery } = useContext(Context)
    
    let value1=""

    return <>
    {view==="productCategory" && <Redirect to="/productsCategory"/>}
    <div className="nav2">
    <form onSubmit={event => {
                event.preventDefault()
                setProductQuery(value1)
                setView("productCategory")
                            }} >
        
                <select className="select" onChange={event=>{
                event.preventDefault()
                value1=event.target.value
                
                }}>
                    <option>Select a category</option>
                    <option value="T-shirt">T-shirts</option>
                    <option value="Nocilla">Nocilla</option>
                    <option value="Duck">Duck</option>
                    <option value="Pig">Pig</option>
                    <option value="Full equip">team</option>
                    <option value="Mug">Mugs</option>
                    <option value="Frame First">Frame First</option>
                    <option value="Frame Trek">Frame Trek</option>
                    <option value="Carlos">Carlos</option>
                    <option value="Mentors">Mentors</option>
                    <option value="Full equip">Full equip</option>

                </select>
                <button type="submit" className="select-submit" >Search </button>
           </form>
           
    </div>
        
    </>
}

export default AdvancedSearch