import React, { useEffect, useState } from "react";
import { retrieveSelectMain } from "../service/ApiService";
import { Link } from "react-router-dom";
function AppliMain() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    retrieveSelectMain().then((items) => {
      setItems(items);
    });
  });
  return (
    <>
      <div className="container">
        <h2>지원 현황</h2>
        <div className="row">
          {items.map((item) => (
            <div className="col-3">
              <Link
                className="nav-link btn btn-light"
                to={`/postView/${item.id}`}
              >
                <p className="d-block">{item.title}</p>
                <p className="d-block">
                  {item.currentPerson === item.person ? "모집완료" : "모집중"}
                  {item.currentPerson}/{item.person}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default AppliMain;
