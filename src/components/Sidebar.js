import React, { useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SidebarOption from "./SidebarOption";
import DraftsIcon from "@mui/icons-material/Drafts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import AddIcon from "@mui/icons-material/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "@mui/material/Avatar";

function Sidebar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  console.log(user);
  return (
    <>
      <SidebarContainer>
        {showModal && (
          <Modal>
            <div className="modal-container">
              <h2>{user?.displayName}</h2>
              <p>Email: {user?.email}</p>
              <button onClick={() => closeModal()}>Close</button>
            </div>
          </Modal>
        )}
        <SidebarHeader>
          <SidebarInfo>
            <h2>{user?.displayName}</h2>
            <h3>
              <FiberManualRecordIcon />
            </h3>
          </SidebarInfo>
          <HeaderAvatar
            onClick={() => handleShowModal()}
            src={user?.photoURL}
            alt={user?.displayName}
          />
        </SidebarHeader>
        <SidebarOption Icon={DraftsIcon} title="Notifications" />
        <SidebarOption Icon={PeopleAltIcon} title="Find a new buddy" />
        {/* <SidebarOption Icon={ExpandLessIcon} title="Show Less" />
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title="Show More" /> */}
        <hr />
        <SidebarOption Icon={AddIcon} addChannelOption title="Add" />
        {channels?.docs.map((doc) => (
          <SidebarOption
            key={doc.id}
            id={doc.id}
            selectChannelOption
            title={doc.data().name}
          />
        ))}
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
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

const SidebarContainer = styled.div`
  color: #072d24;
  background-color: var(--chat-color);
  background-image: linear-gradient(var(--chat-color), #0bd6e3);
  flex: 0.3;
  border-top: 1px solid #2bcaa6;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid white;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #2bcaa6;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #2bcaa6;
    font-size: 2rem;
    background-color: #072d24;
    border-radius: 50%;
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    width: 390px;
    height: 200px;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 8px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  h2 {
    font-size: 1.2rem;
    text-align: center;
  }
  button {
    width: 60%;
    background-color: var(--chat-color);
    border: none;
    margin: 0 auto;
    color: #072d24;
    border-radius: 8px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
    cursor: pointer;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: lime;
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 12px;
    }
  }
`;
