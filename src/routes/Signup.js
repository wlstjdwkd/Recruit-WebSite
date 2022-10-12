import React, { useState } from "react";
import Top from "./Top";
import { signup } from "../service/ApiService";

function Signup() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [technic, setTechnic] = useState("");
  const [intro, setIntro] = useState("");

  const onRegister = async (e) => {
    console.log("front signup");
    e.preventDefault();

    const req = {
      userId: userId,
      password: password,
      username: username,
      phone: phone,
      email: email,
      technic: technic,
      intro: intro,
    };
    signup(req).then((res) => {
      window.location.href = "/";
    });
  };

  return (
    <>
      <Top></Top>
      <div className="container">
        <h2>회원가입</h2>
        <form
          onSubmit={(e) => {
            onRegister(e);
          }}
        >
          <div className="row">
            <div className="col-6">
              <h4>필수 입력 사항</h4>
              <dt>아이디</dt>
              <input
                type="text"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                placeholder="아이디를 입력해 주세요."
              />
              <dt>비밀번호</dt>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="비밀번호를 입력해 주세요."
              />
              <dt>성명</dt>
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="성명을 입력해 주세요."
              />
              <dt>연락처</dt>
              <input
                type="text"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="연락처를 입력해 주세요."
              />
              <dt>이메일</dt>
              <input
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="이메일을 입력해 주세요."
              />
            </div>
            <div className="col-6">
              <h4>선택 입력 사항</h4>
              <dt>사용 기술</dt>
              <input
                type="text"
                onChange={(e) => {
                  setTechnic(e.target.value);
                }}
                placeholder="사용 기술을 입력해 주세요."
              />
              <dt>자기 소갯말</dt>
              <input
                type="text"
                onChange={(e) => {
                  setIntro(e.target.value);
                }}
                placeholder="자기 소갯말을 입력해 주세요."
              />
              <div>
                <button type="submit" className="btn-warning">
                  가입하기
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Signup;
