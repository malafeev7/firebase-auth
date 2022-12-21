import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
`

const Descriptions = styled.p`
color: red;

`

const Box = styled.div`
`

const Button = styled.button`
padding: 10px 10px;
border-radius: 20px;
background-color: red;
color: white;
font-weight: 700;
border: none;
cursor: pointer;
`;



const Cart = (props) => {
  return (
    <Box>
        <Title>Надо купить</Title>
        <Descriptions>{props.title}</Descriptions>
        <Button onClick={(() => props.deleteToDatabase(props.id))}>Удалить</Button>
        
    </Box>
  )
}

export default Cart