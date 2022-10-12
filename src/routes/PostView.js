import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrievePost } from "../service/ApiService";
import Top from "./Top";

function PostView() {
  let postId = useParams();
  const [items, setItems] = useState(null);
  const req = { id: postId.postId };

  useEffect(() => {
    retrievePost(req).then((items) => {
      setItems(items);
    });
  }, []);

  if (items) {
    return (
      <>
        <Top></Top>
        <div className="container">
          <h2 className="text-center">{items[0].title}</h2>
          <dt>모집 현황</dt>
          <p className="d-block">
            {items[0].currentPerson} / {items[0].person}
            {/* {items[0].currentPerson === items[0].person ? "모집완료" : "모집중"} */}
            {items[0].userId === localStorage.getItem("USERID") ? (
              <Link
                className="btn btn-warning"
                to="/selectPerson"
                state={{
                  item: items[0],
                }}
              >
                지원현황 보기
              </Link>
            ) : (
              <Link
                className="btn btn-warning"
                to="/application"
                state={{ item: items[0] }}
              >
                지원하기
              </Link>
            )}
          </p>
          <hr />
          <dt>- 소개</dt>
          <p className="d-block">{items[0].explan}</p>
          <hr />
          <dt>- 기술/언어</dt>
          <p className="d-block">{items[0].technic}</p>
          <hr />
          <dt>- 지역</dt>
          <p className="d-block">{items[0].region}</p>
        </div>
      </>
    );
  }
}

export default PostView;
