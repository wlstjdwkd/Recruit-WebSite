import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ACCESS_TOKEN = "ACCESS_TOKEN";

function Top() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const username = localStorage.getItem("USERNAME");
  console.log(accessToken);
  console.log(username);
  const logout = () => {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <div>
          {accessToken === "null" ? (
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link btn btn-light" to="/login">
                  로그인
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-light" to="/signup">
                  회원가입
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link btn btn-light" to="/selectPerson">
                  지원 현황
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-light" to="/mypage">
                  {username}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-light" to="/postCreate">
                  모임 생성
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-light"
                  to="/"
                  onClick={logout}
                >
                  로그아웃
                </Link>
              </li>
            </ul>
          )}
        </div>
        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <p>
                <Link className="nav-link text-dark" to="/">
                  메인
                </Link>
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Top;
