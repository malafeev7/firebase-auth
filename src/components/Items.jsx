import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
margin-top: 150px;
`

const Descriptions = styled.p`

`

const Button = styled.button`
padding: 10px 10px;
border-radius: 20px;
background-color: green;
color: white;
font-weight: 700;
border: none;
cursor: pointer;
`

const Items = (props) => {
  return (
    <div>
        <Title>{props.title}</Title>
        <Descriptions>{props.descriptions}</Descriptions>
        <Button onClick={(() => props.writeToDatabase())}>Добавить книгу</Button>
    </div>
  )
}

export default Items