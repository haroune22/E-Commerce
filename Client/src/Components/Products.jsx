import styled from 'styled-components'
import { popularProducts } from "../data";
import Product from './Product';
import { useEffect, useState } from 'react';
import axios from "axios"



const Container = styled.div`
padding:20px;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`

const Products = ({cat,filters,Sort}) => {

  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])
useEffect(()=>{
  const getProducts = async ()=>{
    try {
      const res = await axios.get(
        cat ?`http://localhost:7100/api/products?category${cat}` :`http://localhost:7100/api/products`)
     setProducts(res.data)
    } catch (error) {
      
    }
  }
  
getProducts();
},[cat])
useEffect(()=>{
cat && setFilteredProducts(
  products.filter((item)=> Object.entries(filters).every(([key,value])=>
  item[key].includes(value)
  )
)
)
},[products,cat,filters]);

useEffect(()=>{
if(Sort==="Neweset"){
  setFilteredProducts(prev=>[...prev].sort((a,b)=> a.createdAt -b.createdAt))
} else if(Sort==="asc"){
  setFilteredProducts(prev=>[...prev].sort((a,b)=> a.price -b.price))
} else {
  setFilteredProducts(prev=>[...prev].sort((a,b)=> b.price -a.price))
}
},[Sort])
  return (
    <Container>
        {cat ? filteredProducts.map(product =>(
            <Product key={product.id} product={product} />
        )): products.slice(0,8).map(product =>(
          <Product key={product.id} product={product} />
      ))}
    </Container>
  )
}

export default Products