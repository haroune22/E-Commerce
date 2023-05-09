import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../Responsive'
import {useSelector} from "react-redux"
import StripeCheckout from 'react-stripe-checkout'
import {userRequest} from '../RequestMethods'
import {KEY} from '../Config'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Container = styled.div`
`
const Wrapper = styled.h3`
padding:20px;
${mobile({ padding: "10px" })}
`
const Title = styled.h1`
font-weight:300;
text-align:center;
`
const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:20px;
`
const TopButton = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
${mobile({ display: "none" })}
`
const TopText  = styled.span`
text-decoration:none;
cursor:pointer; 
margin:0px 10px;
`
const Bottom = styled.div`
display:flex;
justify-content:space-between;
${mobile({ flexDirection: "column" })}
`
    
const Info = styled.div`
flex:3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width: "180px" })}
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div` 
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}

`;
const ProductSize = styled.span``;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 61vh;
`;

const SummaryTitle = styled.h2`
  font-weight: 400;
  margin-left:20px;
`;

const SummaryItems = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;



const Cart = () => {
  const cart = useSelector(state=>state.cart)
  const navigate = useNavigate()
  const [stripeToken,setStripeToken]=useState(null)
  const onToken = (token)=>{
setStripeToken(token)
  }
useEffect(()=>{
  const makeReaquest = async ()=>{
    try {
      const res = await userRequest.post("/Checkout/payment",{
        tokenId: stripeToken.id,
        amount:500,
      });
      navigate("/Success" ,{state:{stripeData:res.data,
      products:cart,}})
    } catch {
      
    }
  }
 stripeToken && makeReaquest()
},[stripeToken,cart.total,navigate])
  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>
        YOUR BAG
            </Title>
        <Top>
            <TopButton>
                CONTINUE SHOPPING
            </TopButton>
            <TopTexts>
                <TopText>Shopping Bag (2)</TopText>
                <TopText>Your Wishlist (0)</TopText>
            </TopTexts>
            <TopButton type="filled">
                CHECKOUT NOW
            </TopButton>
        </Top>
        <Bottom>
            <Info>
               {cart.products.map((product)=> <Product>
                    <ProductDetail>
                        <Image src={product.img}/>
                        <Details>
                            <ProductName>
                            <b>Product:</b> {product.title}
                            </ProductName>
                            <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
               
                        </Details>
                    </ProductDetail>
                    <PriceDetails>
                    <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                            <ProductPrice>
                               {product.price * product.quantity}
                            </ProductPrice>
                    </PriceDetails>
                </Product>)}
                <Hr/>
               
            </Info>

            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItems>
                    <SummaryItemText>
                        Subtotal
                    </SummaryItemText>
                    <SummaryItemText>
                        $ {cart.total}
                    </SummaryItemText>
                </SummaryItems>
                <SummaryItems>
                    <SummaryItemText>
                        Estimated Shipping
                    </SummaryItemText>
                    <SummaryItemPrice>
                        $ 5.90
                    </SummaryItemPrice>
                </SummaryItems>
                <SummaryItems>
                    <SummaryItemText>
                      Shipping Discount
                    </SummaryItemText>
                    <SummaryItemPrice>
                        $ -5.90
                    </SummaryItemPrice>
                </SummaryItems>
                <SummaryItems type="total">
                    <SummaryItemText>
                        Total:
                    </SummaryItemText>
                    <SummaryItemPrice>
                        $ {cart.total}
                    </SummaryItemPrice>
                </SummaryItems>
                <StripeCheckout
              name="Haroune Shop"
              image=""
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
            </Summary>
        </Bottom>
        </Wrapper>
        <Footer />

    </Container>
  )
}

export default Cart