import React from "react";
import styled from "styled-components";

export default function Toast({message}) {
  return (
    <StyledToast>
      <div className="message">{message}</div>
    </StyledToast>
  );
}
const StyledToast = styled.div`
  z-index: 100;
  position: absolute;
  top:8%;
  .message{
    color:var(--but);
    font-weight:600;
    font-size: 1.2rem;
  }
`;
