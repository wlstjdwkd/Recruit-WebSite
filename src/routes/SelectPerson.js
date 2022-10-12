import Top from "./Top";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  retrieveSelect,
  checkPerson,
  confirmPerson,
} from "../service/ApiService";

function SelectPerson() {
  const location = useLocation();
  const postId = location.state.item.id;
  const req = {
    postId: postId,
  };
  const [items, setItems] = useState(null);
  useEffect(() => {
    console.log("useEffect");
    retrieveSelect(req).then((items) => {
      setItems(items);
    });
  }, []);
  const checkboxEventHandler = (item) => {
    console.log(item.target.checked);
    const words = item.target.value.split(",");
    console.log(words);
    const req2 = {
      id: words[0],
      postId: postId,
      reason: words[1],
      selectPerson: item.target.checked ? true : false,
      userId: words[2],
      username: words[3],
    };
    console.log("checkbox event");

    checkPerson(req2).then((items) => {
      setItems(items);
    });
  };
  const confirmSelect = (e) => {
    var cnt = 0;
    items.map((item) => {
      if (item.selectPerson === true) {
        cnt++;
      }
    });
    const req2 = {
      id: location.state.item.id,
      currentPerson: cnt,
      explan: location.state.item.explan,
      image: location.state.item.image,
      person: location.state.item.person,
      region: location.state.item.region,
      technic: location.state.item.technic,
      title: location.state.item.title,
      userId: location.state.item.userId,
    };
    confirmPerson(req2).then((res) => {
      window.location.href = "/";
    });
  };
  console.log(items);
  if (items) {
    return (
      <>
        <Top></Top>
        <div className="container text-center">
          <div className="row text-center">
            <div className="col-4">상세보기 </div>
            <div className="col-4">선별여부 </div>
            <div className="col-4">지원사유 </div>
          </div>
          <hr />
          {items.map((item) => (
            <div className="row text-center">
              <div className="col-4">
                {item.username}
                <Link className="btn btn-light" to={`/mypage/${item.userId}`}>
                  상세보기
                </Link>
              </div>
              <div className="col-4">
                <input
                  type="checkbox"
                  onChange={checkboxEventHandler}
                  checked={item.selectPerson}
                  value={[item.id, item.reason, item.userId, item.username]}
                ></input>
              </div>
              <div className="col-4">
                <input type="text" readOnly="true" value={item.reason}></input>
              </div>

              <hr />
            </div>
          ))}
          <div>
            <p>
              {location.state.item.currentPerson}/{location.state.item.person}
            </p>
            <button class="btn-warning" onClick={confirmSelect}>
              확정
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default SelectPerson;
