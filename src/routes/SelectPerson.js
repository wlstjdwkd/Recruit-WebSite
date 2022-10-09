import Top from "./Top";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { call } from "../service/ApiService";

function SelectPerson() {
  const location = useLocation();
  const postId = location.state.item;
  const req = { postId: postId };
  const [items, setItems] = useState(null);
  useEffect(() => {
    call("/appli/selectPerson", "POST", req)
      .then((response) => response.data)
      .then((items) => {
        setItems(items);
      });
  }, []);
  if (items) {
    return (
      <>
        <Top></Top>
        <div className="container"></div>
      </>
    );
  }
}

export default SelectPerson;
