import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import {BrowserRouter as Router,
  Routes,
  Route,
  Link
  }from 'react-router-dom'
import Success from './pages/Success'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector(state=>state.user.currentUser)
  return (
    
    <div className="App">
     <Router>
    <Routes>
      {user && <>
        <Route exact path="/" element={<Home/>}/>
        <Route  path="/Products/:category" element={<ProductList/>}/>
        <Route  path="/Product/:id" element={<Product/>}/>
        <Route  path="/Cart" element={<Cart/>}/>
        <Route  path="/Success" element={<Success/>}/>
        </>}
      <Route  path="/Login" element={user ? <Home/> : <Login/>}/>
      <Route  path="/Register" element={user ? <Home/> : <Register/>}/>
      </Routes>
      </Router>
    </div>
  )
}

export default App
