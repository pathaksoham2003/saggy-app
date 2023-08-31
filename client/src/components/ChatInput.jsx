import React, { useState } from "react";
import styled from "styled-components";
const ChatInput = ({ handelSendMsg }) => {
  const [msg, setMsg] = useState();
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handelSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <StyledContainer>
      <form className="input-holder" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type the message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">Send</button>
      </form>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  background-color: var(--bgc-acc);
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  form {
    display: grid;
    grid-template-columns: 90% 10%;
    border-radius: 10%;
    input {
      padding: 10px;
      background-color: var(--bgc);
      border:none;
      color: var(--h);
    }
    button{
      background-color: var(--but);
      border: none;
    }
  }
`;
export default ChatInput;
