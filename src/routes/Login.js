import React, { useState, useEffect } from "react";
import Top from "./Top";
import { login } from "../service/ApiService";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onIDHandler = (e) => {
    setUserId(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onLogin = async (e) => {
    e.preventDefault();
    const req = { userId: userId, password: password };
    login(req);
  };
  
  return (
    <>
      <Top></Top>
      <div className="container text-center">
        <h2>로그인</h2>
        <br />
        <form
          noValidate
          onSubmit={(e) => {
            onLogin(e);
          }}
        >
          <div>
            <input
              type="text"
              onChange={onIDHandler}
              placeholder="아이디를 입력해 주세요."
            ></input>
          </div>
          <div>
            <input
              type="password"
              onChange={onPasswordHandler}
              placeholder="비밀번호를 입력해 주세요."
            ></input>
          </div>
          <br />
          <div>
            <button className="btn-warning" type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
