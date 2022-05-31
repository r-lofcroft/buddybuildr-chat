import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { db, auth, provider } from "../Firebase";

function Login() {
  const saveUserToStore = (user) => {
    const userRef = db.collection("user");
    userRef.doc(user.uid).set({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).then((result) => {
      console.log(result.additionalUserInfo);
      if (result.additionalUserInfo.isNewUser) {
        const user = result.user;
        saveUserToStore(user);
      }
    });
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img alt="Buddybuildr logo" src="logo.svg"></img>
        <h1>Welcome to Buddybuildr</h1>
        <p>Let's get started!</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: var(--chat-color);
  background-image: linear-gradient(var(--chat-color), #0bd6e3);
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  > img {
    object-fit: contain;
    height: 200px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 40px;
    text-transform: inherit !important;
    background-color: #0bd6e3 !important;
    color: black;
  }
  > button:hover {
    opacity: 0.7;
  }
`;
