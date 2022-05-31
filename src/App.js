import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="logo.svg" alt="logo"></img>
          <Spinner name="line-scale-party" color="#00cd9f" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} exact />
            </Routes>
          </AppBody>
        </>
      )}
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoading = styled.div`
  background-color: var(--chat-color);
  background-image: linear-gradient(var(--chat-color), #0bd6e3);
  height: 100vh;
  display: grid;
  place-items: center;
`;
const AppLoadingContents = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  > img {
    object-fit: contain;
    height: 200px;
    margin-bottom: 40px;
  }
`;
