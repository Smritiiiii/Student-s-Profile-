
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import socketIO from "socket.io-client";

import ScrollableFeed from "react-scrollable-feed";

import Message from "./Message";
// import "";

const ENDPOINT = "http://localhost:5050";

const Chat = styled.section`x
transform: translateX(-50%);
margin-left: 50%;
width: 90%;
max-width: 500px; /* Set a maximum width for the chat box */
position: fixed; /* Fix the position */
bottom: 10px; /* Adjust the distance from the bottom */
background: white;
padding: 1rem;
border-radius: 0.5rem;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
overflow: hidden; /* Hide overflow */
  // transform: translateX(-50%);
  // margin-left: 50%;
  // width: 90%;
  // background: white;
  // padding: 1rem;
  // border-radius: 0.5rem;
  // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const ChatBoxContent = styled.main`
  padding: 0.25rem;
  height: 20rem;
  /* overflow-y: scroll; */
`;

const ChatField = styled.input`
  width: 85%;
  font-size: 1rem;
  @media (max-width: 960px) {
    margin-top: 1rem;
    width: 100%;
  }

  &:focus {
    border: 1px solid #440ccc;
  }

  background: rgb(249, 249, 249);
  outline: none;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.15rem;
`;

const PrimaryBtn = styled.button`
  width: 15%;
  background: #440ccc;
  color: white;
  border: none;
  outline: none;
  font-size: 1.25rem;
  /* height: 1; */
  cursor: pointer;
  &:hover {
    background: #3606a7;
  }

  @media (max-width: 960px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const SendSection = styled.div`
  @media (max-width: 960px) {
    flex-direction: column;
  }

  padding: 0.5rem 0rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const ChatBox = () => {
  // ?STATE
  const [name, setname] = useState("");

  const [id, setId] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // ? SOCKET
    // !when circuit is established
    socket.on("connect", () => {
      console.log("connected to socket-server from client");
      setId(socket.id);
    });
    //! message from admin after successful circuit establishment
    socket.on("welcome", (data) => {
      // @ts-ignore
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    // !broadcast that , a new user has joined the chat to all other people except that new user
    socket.on("userJoined", (data) => {
      // @ts-ignore
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    //! broadcast that , a  user has left the chat to all other
    socket.on("leave", (data) => {
      // @ts-ignore
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      //  @ts-ignore
      socket.off();
    };
  }, []);

  
  // change state of message to send on change of input
  const updateMessage = (e) => {
    // @ts-ignore
    setMessageToSend(e.target.value);
  };
  // send message to socket server
  const sendMessage = () => {
    //! send message to socket server
    socket.emit("message", { message: messageToSend, id });
   
    setMessageToSend("");
  };

  useEffect(() => {
    socket.on("message", (data) => {
      // @ts-ignore
      setMessages([...messages, data]);
      console.log(data.user);
      console.log(data.message);
      console.log(data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <Chat>
     
      <header>
        <h2
          className='dashboard_subtitle poppins_medium_500'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Chat Anyone, Anywhere !
        </h2>
      </header>
      <ChatBoxContent>
        <ScrollableFeed>
          <div>
            <div className='MessageContainer'>
              <div className={`MessageContainer__message--left`}>
                <span className='MessageContainer__message--user'>Hi</span>
                <br />

                <span className='poppins_regular_400'>Welcome to our chat.</span>
              </div>
            </div>
          </div>
          {/* //todo: messageObj contains user,message,id  */}
          {messages.map((messageObj, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <Message user={messageObj.id === id ? "You" : messageObj.user.name} message={messageObj.message} classs={messageObj.id === id ? "right" : "left"} />
              </div>
            );
          })}
        </ScrollableFeed>
      </ChatBoxContent>

      <SendSection>
        <ChatField
          type='text'
          onChange={(e) => {
            updateMessage(e);
          }}
          onKeyPress={(e) => {
            // eslint-disable-next-line no-unused-expressions
            e.key === "Enter" ? sendMessage() : null;
          }}
          value={messageToSend}
        />
        <PrimaryBtn className='poppins_regular_400' onClick={sendMessage}>
          send
        </PrimaryBtn>
      </SendSection>
    </Chat>
  );
};

export default ChatBox;
