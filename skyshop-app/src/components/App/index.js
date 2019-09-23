/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import Context from '../Context'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import RegisterSuccess from '../RegisterSuccess'
import Cart from '../Cart'
import Admin from '../Admin'
import AdvancedSearch from '../AdvancedSearch'
import Products from '../Products'
import AdminRegisterProduct from '../AdminRegisterProduct'
import ProductDetail from '../ProductDetail'
import ProductsCategory from '../ProductsCategory'
import ShowAllOrders from '../AdminViewOrders'
import AdminUpdate from '../AdminUpdate'
import User from '../User'
import UserUpdate from '../UserUpdate'
import ShowAllOrdersUser from '../UserOrders'
import UserRemove from '../UserRemove'
import UserCart from '../UserCart'
import Checkout from '../UserSuccess'
import Stock from '../AdminStock'
import ProductSuccess from '../AdminSuccess'
import UpdateProducts from '../AdminProductUpdate'
import UpdateSelectedProduct from '../AdminProductUpdateSelected'
import ProductUpdateSuccess from '../AdminSuccessUpdate'
import RemoveProducts from '../AdminProductRemove'
import Auctions from '../Auctions'
import AuctionDetail from '../AuctionDetail'

import { withRouter, Route } from 'react-router-dom'

import './index.sass'

function App() {

  const [view, setView] = useState('')
  const [credentials, setCredentials] = useState()
  const [user, setUser] = useState()
  const[admin,setAdmin] =useState('')
  const[advancedSearch,setAdvancedSearch]=useState(false)
  const[products,setProducts]=useState()
  const[product,setProduct]=useState()
  const[productQuery,setProductQuery]=useState()
  const[orders,setOrders]=useState()
  const[cart,setCart]=useState() 
  const[css,setCss]=useState("productAvailable")
  const[actualDate,setActualDate]=useState()


  return(
  <div className="App">
    <Context.Provider value={{ view, setView, credentials, setCredentials, user, setUser, admin,setAdmin, 
      advancedSearch, setAdvancedSearch, products,setProducts,
       product,setProduct, productQuery,setProductQuery, orders,setOrders, cart,setCart, css,setCss,
       actualDate,setActualDate}} >

      <Route path="/" render={() => <Landing /> } />
      {advancedSearch && < Route path="/" render={() => <AdvancedSearch /> } />}

      <Route path="/register" render={() => <Register /> } />
      <Route path="/login" render={() => <Login /> } />
      <Route path="/registersuccess" render={() => <RegisterSuccess /> } />
      <Route exact path="/" render={() => <Products /> } />
      <Route exact path="/productDetail" render={() => <ProductDetail /> } />
      <Route path="/cart" render={() => <Cart /> } />
      <Route path="/productsCategory" render={() => <ProductsCategory /> } />

      <Route exact path="/admin" render={() => <Admin /> } />
      <Route path="/admin/update-product" render={() => <UpdateProducts /> } />
      <Route exact path="/admin/update-selected" render={() => <UpdateSelectedProduct /> } />
      <Route path="/admin/update-selected/success" render={() => <ProductUpdateSuccess /> } />
      <Route path="/admin/admin-update" render={() => <AdminUpdate /> } />
      <Route path="/admin/success" render={() => <ProductSuccess /> } />
      <Route path="/admin/register-products" render={() => <AdminRegisterProduct /> } />
      <Route path="/admin/view-orders" render={() => <ShowAllOrders /> } />
      <Route path="/admin/stock" render={() => <Stock /> } />
      <Route path="/admin/remove-product" render={() => <RemoveProducts /> } />

      <Route exact path="/profile" render={() => <User /> } />
      <Route path="/profile/user-update" render={() => <UserUpdate /> } />
      <Route path="/profile/user-orders" render={() => <ShowAllOrdersUser /> } />
      <Route path="/profile/user-remove" render={() => <UserRemove /> } />
      <Route path="/user-cart" render={() => <UserCart /> } />
      <Route path="/profile/success" render={() => <Checkout /> } />

      <Route exact path="/auctions" render={() => <Auctions /> } />
      <Route path="/auctions/detail" render={() => <AuctionDetail /> } />








    </Context.Provider>
    </div>)
}

export default withRouter(App);