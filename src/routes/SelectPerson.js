import Top from "./Top";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { call } from "../service/ApiService";

function SelectPerson() {
  const location = useLocation();
  const postId = location.state.item.id;
  const req = {
    postId: postId,
  };
  const [items, setItems] = useState(null);
  useEffect(() => {
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
        window.location.reload();
      });
  };
  const confirmSelect = (e) => {};
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
            <button class="btn-warning">확정</button>
          </div>
        </div>
      </>
    );
  }
}

export default SelectPerson;
