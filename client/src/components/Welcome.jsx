import React from 'react'
import styled from "styled-components";
const Welcome = ({currentuser}) => {
  return (
    <StyledContainer><h1>hi {currentuser.username}!</h1></StyledContainer>
  )
}
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
  background-color:var(--bgc);
  h1{
    color:var(--h);
  }
`

export default Welcome