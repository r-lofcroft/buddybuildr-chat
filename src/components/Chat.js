import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import Message from "./Message";
function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {(roomDetails && roomMessages) || loading ? (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>{roomDetails?.data().name}</strong>
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.Id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      ) : (
        <InterimContainer>
          <InterimInner>
            <p>Please select a chat-channel to view messages.</p>
          </InterimInner>
        </InterimContainer>
      )}
    </ChatContainer>
  );
}

export default Chat;
const InterimContainer = styled.div`
  background-color: var(--chat-color);
  background-image: linear-gradient(var(--chat-color), #0bd6e3);
  border-left: 1px solid #2bcaa6;
  border-top: 1px solid #2bcaa6;
  height: 100%;
  display: flex;
  justify-content: center;
  /* overflow-x: hidden;
  overflow-y: hidden; */
`;
const InterimInner = styled.div`
  margin: auto 0;
  > p {
    font-weight: 500;
    padding: 0 20px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const ChatMessages = styled.div``;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    font-size: 15px;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
