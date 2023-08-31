import React, { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assets/react.webp";
import { useNavigate } from "react-router-dom";
const Contacts = ({ contacts, currentuser, changeChat }) => {
  const navigate = useNavigate();
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);
  useEffect(() => {
    if (currentuser) {
      setcurrentUserName(currentuser.username);
    }
  }, [currentuser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelectedChat(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <StyledContacts>
          <div className="heading flex-center">
            <div>
              <h2>Saggy </h2>
              <p>{currentUserName}</p>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              LOG OUT
            </button>
          </div>
          <div>
            {contacts?.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelectedChat ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <img src={img} alt="image" />
                  <div className="username">
                    <p>{contact.username}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </StyledContacts>
      )}
    </>
  );
};
const StyledContacts = styled.div`
  position: relative;
  overflow: hidden;
  background-color: var(--bgc);
  border-right: 2px solid var(--grd-c1);
  .heading {
    background: linear-gradient(to right, var(--grd-c1), var(--grd-c2));
    height: 12vh;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    align-items: center;
    padding: 20px;
    border-bottom: 2px solid var(--grd-c1);
    button {
      height: fit-content;
      padding: 5px 10px;
      margin: 20px;
      font-weight: 800;
      border: none;
      color: var(--but);
      background-color: white;
      border-radius: 10px;
    }
  }
  .contacts {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 85vh;
  }
  .contact {
    display: flex;
    padding: 12px;
    color: var(--h);
    font-weight: 400;
    font-size: large;
    background-color: var(--bgc);
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .selected {
    color:white;
    transition-property: color;
    transition-duration: 0.1s;
    font-weight: 700;
    background: linear-gradient(to right, var(--grd-c1), var(--grd-c2));
  }
`;
export default Contacts;
