import styled from 'styled-components'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from 'react';
import { sliderItems } from '../data';
import { mobile } from '../Responsive';

const Container = styled.div`
width:  100%;
 height: 100vh;
 display: flex;
 position: relative;
 overflow: hidden;
 ${mobile({ display: "none" })}
`
const Arrow = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
display: flex;
align-items: center;
 justify-content: center;
 position: absolute ;
 top: 0;
 bottom:0;
 left: ${props => props.direction === "left" && "10px"};
 right: ${props => props.direction === "right" && "10px"};
 margin:  auto;
 cursor: pointer;
 opacity:0.5;
 z-index: 2;
`
const Wrapper = styled.div`
height:100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${props=>props.slideIndex * -97.5}vw);
`
const Slide = styled.div`
width:97.5vw;
height:100vh;
display:flex;
align-items:center;
background-color:#${props=>props.bg};
`
const ImgContainer = styled.div`
height:100%;
flex:1;
`
const Img = styled.img`
height:80%;
`
const InfoContainer = styled.div`
flex:1;
padding:50px;

`

const Title = styled.h1`
font-size: 50px;
font-weight: 700;
margin-bottom: 10px;
`

const Description = styled.h2`
font-size: 20px;
font-weight: 500;
margin: 40px 0;
letter-spacing:3px;
`

const Button = styled.button`
width: 100px;
height: 40px;
border-radius: 10px;
background-color: transparent;
cursor: pointer;
`


const Slider = () => {
    const[slideIndex,setSlideIndex]=useState(0)
    const handleClick = (direction)=>{
        if(direction==="left"){
            setSlideIndex(slideIndex > 0 ?slideIndex-1 : 2)
            
        }else{
            setSlideIndex(slideIndex < 2 ?slideIndex + 1 : 0)
        }
    }
  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlinedIcon/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map(item=>(

            <Slide key={item.id} bg={item.bg}>
            <ImgContainer>
            <Img src={item.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>
                    {item.title}
                </Title>
                <Description>
                    {item.desc}
                </Description>
                <Button>SHOP NOW</Button>
            </InfoContainer>
            </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlinedIcon/>
        </Arrow>
    </Container>
  )
}

export default Slider