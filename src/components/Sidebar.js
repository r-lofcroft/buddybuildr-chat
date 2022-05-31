import React, { useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import SidebarOption from "./SidebarOption";
import DraftsIcon from "@mui/icons-material/Drafts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "@mui/material/Avatar";
import { slide as Menu } from "react-burger-menu";

function Sidebar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const [hidden, setHidden] = useState(false);

  const hideSidebar = () => {
    setHidden(true);
  };

  return (
    <SidebarContainer hidden={hidden}>
      <SidebarHeader>
        <SidebarInfo>
          <h2>{user?.displayName}</h2>
          <h3>
            <FiberManualRecordIcon />
          </h3>
        </SidebarInfo>
        <HeaderAvatar src={user?.photoURL} alt={user?.displayName} />{" "}
      </SidebarHeader>
      <SidebarOption Icon={DraftsIcon} title="Notifications" />
      <SidebarOption Icon={PeopleAltIcon} title="Find a new buddy" />
      <SidebarOption
        onClick={hideSidebar}
        Icon={ExpandLessIcon}
        title="Show Less"
      />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Show More" />
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
  );
}

export default Sidebar;
const HeaderAvatar = styled(Avatar)`
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

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
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
