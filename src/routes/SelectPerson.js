import Top from "./Top";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { call } from "../service/ApiService";

function SelectPerson() {
  const location = useLocation();
  const postId = location.state.item.id;
  // console.log(cnt);
  const req = {
    postId: postId,
  };
  const [items, setItems] = useState(null);
  useEffect(() => {
    console.log("useEffect");
    call("/appli/selectPerson", "POST", req)
      .then((response) => response.data)
      .then((items) => {
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
    call("/appli", "PUT", req2)
      .then((response) => response.data)
      .then((items) => {
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
    call("/post", "PUT", req2).then((response) => {
      window.location.href = "/";
    });
  };
  console.log(items);
  if (items) {
    return (
      <>
        <Top></Top>
        <div className="container text-center">
          {items.map((item) => (
            <div>
              {item.username}
              <button>상세보기</button>
              <input
                type="checkbox"
                onChange={checkboxEventHandler}
                checked={item.selectPerson}
                value={[item.id, item.reason, item.userId, item.username]}
              ></input>
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
