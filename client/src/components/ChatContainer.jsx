import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { getMessageRoute, sendMessageRoute } from "../utils/APIroutes";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import img from "../assets/react.webp";
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  // This following function is soally responsible for the re render after we get data from the local storage
  useEffect(() => {
    if (currentChat) {
      async function fetchMessages() {
        const response = await axios.post(getMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
      fetchMessages();
    }
  }, [currentChat]);
  // sending message
  const handelSendMsg = async (msg) => {
    await axios
      .post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      })
      .then((msg) => {
        //console.log(msg.data.msg);
      });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      messages: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  const [arrivalMessage, setArrivalMessage] = useState();
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  // the following useEffect is used to re-render the page when the arrived message is updated
  // ans before re rendering we add the arrived message to the messages array which holds all the messages
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // The following code is to scroll the chat section as the number of messages grow
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <StyledContainer>
      <div className="chat-header">
        <div className="user-details">
          <img src={img} alt="" />
          <h3>{currentChat.username}</h3>
        </div>
        
      </div>
      <div className="chat-messages">
        {messages.map((msg) => {
          return (
            <div
              ref={scrollRef}
              key={uuidv4()}
              className={`message ${msg.fromSelf ? "sender" : "recieved"}`}
            >
              <p className="message-text">{msg.message}</p>
            </div>
          );
        })}
      </div>
      <ChatInput handelSendMsg={handelSendMsg} />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  position: relative;
  height: 100vh;
  background-color: var(--bgc);
  .chat-header {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    height: 12vh;
    background-color: var(--but);

    .user-details {
      height: inherit;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 20px;
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      h3{
        color: white;
      }
    }
  }
  .chat-messages{
    background-color: transparent;
    width:100%;
    height:70%;
    overflow-y:scroll;
    .message{
      display:flex;
      width:100%;
      .message-text{
        padding: 11px;
        margin: 2px;
        margin-bottom: 0;
      }
    }
    .sender{
      justify-content: flex-end;
      .message-text{
        border-radius: 10px;
        background:linear-gradient(to right,var(--grd-c1),var(--grd-c2));
        color:white;
      }
    }
    .recieved{
      justify-content: flex-start;
      .message-text{
        border-bottom-right-radius:10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background:linear-gradient(to right,var(--grd-c1),var(--grd-c2));
        color:white;
      }
    }
  }
`;
export default ChatContainer;
