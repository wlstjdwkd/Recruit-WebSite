import "./App.css";
import Top from "./routes/Top";
import React, { useState, useEffect } from "react";
import { call } from "./service/ApiService";

// 메인페이지

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    call("/post", "GET", null)
      .then((response) => response.data)
      .then((items) => {
        setItems(items);
      });
  }, []);

  

  return (
    <>
      <Top></Top>

      <div className="container">
        <h2>모집글</h2>
        <div className="row">
          {items.map((item) => (
            <div className="col-3">
              <p className="d-block">{/* 이미지 */}</p>
              <p className="d-block">{item.title}</p>
              <p className="d-block">
                모집완료 {item.currentPerson}/{item.person}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
