import Top from "./Top";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { call } from "../service/ApiService";

function Mypage() {
  const userId = useParams();
  const [items, setItems] = useState(null);
  const loginId = localStorage.getItem("USERID");
  console.log(userId.id);
  const req = { id: userId.id };
  useEffect(() => {
    call("/member/mypage", "POST", req)
      .then((response) => response.data)
      .then((items) => {
        setItems(items);
      });
  }, []);
  console.log(items);
  if (items) {
    return (
      <>
        <Top></Top>
        <div className="container">
          <h2>마이 페이지</h2>
          <dt>아이디</dt>
          <input type="text" readOnly="true" value={items[0].userId}></input>
          <dt>비밀번호</dt>
          <input type="text" readOnly="true" value={items[0].password}></input>
          <dt>성명</dt>
          <input type="text" readOnly="true" value={items[0].username}></input>
          <dt>이메일</dt>
          <input type="text" readOnly="true" value={items[0].email}></input>
          <dt>전화번호</dt>
          <input type="text" readOnly="true" value={items[0].phone}></input>
          <dt>사용 기술</dt>
          <input type="text" readOnly="true" value={items[0].technic}></input>
          <dt>자기 소갯말</dt>
          <input type="text" readOnly="true" value={items[0].intro}></input>
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
