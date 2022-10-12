import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrievePost } from "../service/ApiService";
import Top from "./Top";

function PostView() {
  let postId = useParams();
  const [items, setItems] = useState("");
  const req = { id: postId.postId };

  useEffect(() => {
    retrievePost(req).then((items) => {
      setItems(items[0]);
    });
  }, []);

  if (items) {
    return (
      <>
        <Top></Top>
        <div className="container">
          <h2 className="text-center">{items.title}</h2>
          <dt>모집 현황</dt>
          <p className="d-block">
            {items.currentPerson} / {items.person}
            {/* {items[0].currentPerson === items[0].person ? "모집완료" : "모집중"} */}
            {items.userId === localStorage.getItem("USERID") ? (
              <Link
                className="btn btn-warning"
                to="/selectPerson"
                state={{
                  item: items,
                }}
              >
                지원현황 보기
              </Link>
            ) : (
              <Link
                className="btn btn-warning"
                to="/application"
                state={{ item: items }}
              >
                지원하기
              </Link>
            )}
          </p>
          <hr />
          <dt>- 소개</dt>
          <p className="d-block">{items.explan}</p>
          <hr />
          <dt>- 기술/언어</dt>
          <p className="d-block">{items.technic}</p>
          <hr />
          <dt>- 지역</dt>
          <p className="d-block">{items.region}</p>
        </div>
      </>
    );
  }
}

export default PostView;
