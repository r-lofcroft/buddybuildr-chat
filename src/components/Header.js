import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => handleRedirect("/")}
          src="logo.svg"
          alt={user?.displayName}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <input placeholder="Search..."></input>
      </HeaderSearch>
      <HeaderRight>
        <LogoutIcon onClick={() => auth.signOut()} />
      </HeaderRight>
    </HeaderContainer>
  );
}
export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--chat-color);
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #2bcaa6;
  /* text-align: center; */
  display: flex;
  padding: 0 30px;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    /* text-align: center; */
    min-width: 30vw;
    outline: 0;
    color: white;
  }
  > input:focus::placeholder {
    color: transparent;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    font-size: 40px;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    padding: 8px;
    color: #072d24;
  }
  > .MuiSvgIcon-root:hover {
    opacity: 0.7;
  }
`;
