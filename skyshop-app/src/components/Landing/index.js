import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect, withRouter} from "react-router-dom"
import './index.sass'

function Landing({history}){

    const {  view, setView, user, setUser, admin,setAdmin , advancedSearch, setAdvancedSearch,setCart} = useContext(Context)

    useEffect(() => {

        if (logic.isUserLoggedIn()) {
          async function retrieve() {
            try {
              const { user: userRetrieved } = await logic.retrieveUser()
              setUser(userRetrieved)        
              setAdmin(userRetrieved.isAdmin)  
              setCart(userRetrieved.cart.length)         
            } catch(error) {
              console.log(error.message)          
            }
          }
          retrieve()

        }
    }, [history.location])


    function handleGoAdvancedSearch(event){
      event.preventDefault() 
      setAdvancedSearch(!advancedSearch)
    }

    return <>
    <header>
    {view==="auctions" && <Redirect to="/auctions"/>}
    {view==="landing" && <Redirect to="/"/>}
    {view==="productCategory" && <Redirect to="/productsCategory"/>}
    {admin===true &&
        <nav className="nav">
        <ul className="ul">
            <li className="li--title"><a className="nav-title" onClick={event=>{
                event.preventDefault()
                setView('landing')
            }}>Skyshop</a></li>
            <li className="li">{user.name}</li>
            <li className="li--small"><a href='/#/admin'  className="nav-but"  > <i class="fas fa-home"></i></a></li>
        </ul> 
</nav>
        }
    {user && admin===false &&
        <nav className="nav">
        <ul className="ul">
            <li className="li--title"><a className="nav-title" onClick={event=>{
                event.preventDefault()
                setView('landing')
            }}>Skyshop</a></li>
            <li className="li">{user.name}</li>
            <li className="li--small"><a href='/#/profile'  className="nav-but"  > <i class="fas fa-home"></i></a></li>
            <li className="li--small--cart"><a href='/#/user-cart' ><i className="fas fa-cart-plus"></i></a></li>
        </ul> 
</nav>
        }
        {!user &&
        <nav className="nav">
        <ul className="ul">
            <li className="li--title"><a className="nav-title" onClick={event=>{
                event.preventDefault()
                setView('landing')
            }}>Skyshop</a></li>
            <li className="li"><a href="" className="nav-but" href='/#/register'   >Register</a></li>
            <li className="li--small"><a className="nav-but" href='/#/login' > <i className="fas fa-user"></i></a></li>
            <li className="li--small--cart"><a href='/#/cart' ><i className="fas fa-cart-plus " ></i></a></li>
        </ul> 
        </nav>
        }
        
    
    </header>
    <nav className="nav2">
            <ul className="nav2-ul">
                <li><a className="nav2-but" onClick={event => {
                event.preventDefault()
                setView("auctions")
            }} >Auctions</a></li>
                <li><a className="nav2-but--small"  onClick={handleGoAdvancedSearch}  ><i className="fas fa-search"></i></a></li>
            </ul>
    </nav>
    
    </>
}
export default withRouter(Landing)