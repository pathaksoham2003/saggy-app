import React from "react";
import { Outlet } from "react-router-dom";
import DarkMode from "../components/DarkMode.jsx";
import styled from "styled-components";
const Root = () => {
  return (
    <StyledContainer>
      <div className="theme">
        <DarkMode />
      </div>
      <Outlet />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  .theme {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 200;
  }
`;
export default Root;
