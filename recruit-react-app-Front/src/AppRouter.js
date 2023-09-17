import React from "react";
import App from "./App";
import AppliMain from "./routes/AppliMain";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import PostCreate from "./routes/PostCreate";
import PostView from "./routes/PostView";
import Application from "./routes/Application";
import SelectPerson from "./routes/SelectPerson";
import Mypage from "./routes/Mypage";
import Top from "./routes/Top";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/appliMain" element={<AppliMain />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/mypage/:id" element={<Mypage />}></Route>
        <Route path="/postCreate" element={<PostCreate />}></Route>
        <Route path="/postView/:postId" element={<PostView />}></Route>
        <Route path="/application" element={<Application />}></Route>
        <Route path="/selectPerson" element={<SelectPerson />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
