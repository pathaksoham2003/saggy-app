import styled from "styled-components"
import { useState , useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allContactsRoute } from '../utils/APIroutes';
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";
import { host } from "../utils/APIroutes";
import {useRef} from "react";

export default function Chat(){
    const socket = useRef();
    const naviagte = useNavigate();
    // current user who will be chatting this will be both side (sender side user)
    const [currentuser , setCurrentUser] = useState({});
    // the following code will set the current user who has logged in
    useEffect(()=>{
        if(!localStorage.getItem("nistinder-user")){
            naviagte("/login");
        }
        else{
            let user = JSON.parse(localStorage.getItem("nistinder-user")); //obj
            setCurrentUser(user);
        }
    },[])
   // the following function will create the socket object and store it into the useRef() hood for meutable updates without rendering the component
    useEffect(()=>{
        if(currentuser){
            socket.current = io(host,{
    path: '/socket.io', // Add this if your server uses a custom path
    transports: ['polling', 'websocket'],
    // You can configure additional options here if needed
});
            socket.current.emit("add-user" , currentuser._id)
        }
    }, [currentuser])

    const [contacts ,setContacts] = useState([]);
    //get all constacts if user is present
    useEffect(() => {
        if(currentuser){
            async function fetchAllUsers(){
                const responce = await axios.get(`${allContactsRoute}/${currentuser._id}`)
                setContacts(responce.data)
            }
            fetchAllUsers();
        }
        else{
            naviagte("/login");
        }
    },[currentuser])

    //handel chat change 
    const [currentChat , setCurrentChat] = useState();
    const handelChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return(
        <StyledContainer>
            <Contacts contacts = {contacts} currentuser = {currentuser} changeChat = {handelChatChange}/>
            {
                currentChat === undefined ?
                <Welcome currentuser = {currentuser} /> :
                <ChatContainer currentChat = {currentChat} currentUser = {currentuser} socket={socket}/>
            }
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 25% 75%;
`
