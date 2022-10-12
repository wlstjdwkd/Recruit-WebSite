import Top from "./Top";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mypage } from "../service/ApiService";

function Mypage() {
  const userId = useParams();
  const [items, setItems] = useState("");
  const loginId = localStorage.getItem("USERID");
  const req = { id: userId.id };
  useEffect(() => {
    mypage(req).then((items) => {
      setItems(items[0]);
    });
  }, []);
  if (items) {
    return (
      <>
        <Top></Top>
        <div className="container">
          <h2>마이 페이지</h2>
          <dt>아이디</dt>
          <input type="text" readOnly="true" value={items.userId}></input>
          {/* <dt>비밀번호</dt>
          <input type="text" readOnly="true" value={items.password}></input> */}
          <dt>성명</dt>
          <input type="text" readOnly="true" value={items.username}></input>
          <dt>이메일</dt>
          <input type="text" readOnly="true" value={items.email}></input>
          <dt>전화번호</dt>
          <input type="text" readOnly="true" value={items.phone}></input>
          <dt>사용 기술</dt>
          <input type="text" readOnly="true" value={items.technic}></input>
          <dt>자기 소갯말</dt>
          <input type="text" readOnly="true" value={items.intro}></input>
          <div>
            {userId.id === loginId ? (
              <button type="button" class="btn-warning">
                회원 탈퇴
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default Mypage;
