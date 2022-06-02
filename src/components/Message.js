import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

function Message({ message, timestamp, user, userImage }) {
  return (
    <MessageContainer>
      <HeaderAvatar src={user?.photoURL} alt={user?.displayName} />{" "}
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()} </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  position: unset;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  @media (max-width: 500px) {
    img {
      display: none;
    }
  }
`;
