import React, { useState } from "react";
import Top from "./Top";
import { postCreate } from "../service/ApiService";

function PostCreate() {
  const [title, setTitle] = useState("");
  //일단 이미지 보류
  const [tempFile, setTempFile] = useState();
  const [technic, setTechnic] = useState("");
  const [region, setRegion] = useState("");
  const [person, setPerson] = useState("");
  const [explan, setExplan] = useState("");

  const onCreate = async (e) => {
    console.log("front postCreate");
    e.preventDefault();

    const req = {
      title: title,
      technic: technic,
      region: region,
      person: person,
      explan: explan,
    };

    postCreate(req).then((res) => {
      console.log(req);
      window.location.href = "/";
    });
  };

  return (
    <>
      <Top></Top>
      <div className="container">
        <h2>모임 생성</h2>
        <form
          onSubmit={(e) => {
            onCreate(e);
          }}
        >
          <div className="row">
            <div className="col-6">
              <dt>프로젝트 명</dt>
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="프로젝트 명을 입력해 주세요."
              />
              <dt>대표 이미지</dt>
              <input
                type="file"
                onChange={(e) => {
                  setTempFile(e.target.value);
                }}
              />
              <dt>기술 스택</dt>
              <input
                type="text"
                onChange={(e) => {
                  setTechnic(e.target.value);
                }}
                placeholder="기술 스택을 입력해 주세요."
              />
            </div>
            <div className="col-6">
              <dt>지역</dt>
              <input
                type="text"
                onChange={(e) => {
                  setRegion(e.target.value);
                }}
                placeholder="지역을 입력해 주세요."
              />
              <dt>모집 인원</dt>
              <input
                type="text"
                onChange={(e) => {
                  setPerson(e.target.value);
                }}
                placeholder="모집 인원을 입력해 주세요."
              />
              <dt>프로젝트 설명</dt>
              <input
                type="text"
                onChange={(e) => {
                  setExplan(e.target.value);
                }}
                placeholder="프로젝트 설명을 입력해 주세요."
              />
            </div>
            <div>
              <button type="submit" className="btn-warning">
                작성 완료
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostCreate;
