import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../Responsive';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';



const Container = styled.div`
  height: 60px;
  ${mobile({
    height:"50px"
  })}

`
const Wrapper = styled.div`
padding: 0px 10px;
display: flex;
align-items: center;
justify-content: space-between;
${mobile({
    padding:"0px 0px"
  })}

`
const Left = styled.div`
display:flex;
align-items: center;
flex: 1;
`
const Language = styled.span`
    font-size:14px;
    cursor:pointer;
    ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
border: 0.5px solid lightgrey;
display:flex;
align-items: center;
margin-left:25px;
padding:5px;
`
const Input = styled.input`
border: none;
${mobile({ width: "50px" })}
`
const Center = styled.div`
flex: 1;
text-align:center;

`
const Logo = styled.h1`
font-weight: bold;
font-size: 26px;
${mobile({ fontSize: "24px" })}
    `
const Right = styled.div`
flex: 1;
display:flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`
const MenuItem = styled.div`
font-size:16px;
cursor: pointer;
margin-left:25px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  return (
    <Container >
        <Wrapper>
            <Left>
               <Language>En</Language>
               <SearchContainer>
                <Input/>
                <SearchIcon style={{color:"grey",fontSize:"20px"}} />
               </SearchContainer>
            </Left>
            <Center><Logo>Haroune.</Logo>
</Center>
            <Right>
               <MenuItem>Register</MenuItem>
               <MenuItem>Sign In</MenuItem>
               <Link to={"/Cart"}>
               <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
            <ShoppingCartOutlinedIcon />
            </Badge>
               </MenuItem>
               </Link>

            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar