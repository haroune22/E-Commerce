import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import Announcement from '../Components/Announcement'
import Products from '../Components/Products'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import { mobile } from '../Responsive'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'






const Container = styled.div`
`
const Title= styled.h1`
margin:20px;
`
const FilterContainer= styled.div`
display:flex;
justify-content:space-between;
`
const Filter= styled.div`
margin:20px;
${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
const FilterText = styled.span`
font-size:20px;
font-weight:600;
margin: 20px;
${mobile({ marginRight: "0px" })}
`
const Select = styled.select`
 padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option``

const ProductList = () => {
  const location = useLocation()
 const Cat =  location.pathname.split('/')[2]

 const [filters,setFilters] = useState({})
 const [Sort,setSort] = useState("newest")
 const handelFilters = (e)=>{
  const value = e.target.value;
  setFilters({
    ...filters,
    [e.target.name]:value
  })
 }
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>{Cat}</Title>
        <FilterContainer>
            <Filter >
                <FilterText>
                    Filter Products:
                </FilterText>
                <Select name='color' onChange={handelFilters}>
            <Option  disabled>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Grey</Option>
          </Select>
          <Select name="size" onChange={handelFilters}>
            <Option disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
            </Filter>
            <Filter >
            <FilterText>
                    Sort Products:
                </FilterText>
                <Select onChange={e=>setSort(e.target.value)}>
            <Option value="Newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
            </Filter>
        </FilterContainer>
        <Products cat={Cat} filters={filters} Sort={Sort}/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList