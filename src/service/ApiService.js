import { API_BASE_URL } from "../app-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      if (error.status === 403) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
}

//로그인
export function login(memberDTO) {
  return call("/member/login", "POST", memberDTO).then((response) => {
    if (response.token) {
      //local 스토리지에 토큰 저장
      localStorage.setItem("ACCESS_TOKEN", response.token);
      localStorage.setItem("USERID", response.id);
      localStorage.setItem("USERNAME", response.username);
      //token이 존재하는 경우 메인 페이지로 리디렉트
      window.location.href = "/";
    }
  });
}

//로그아웃
export function logout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  localStorage.setItem("USERID", null);
  localStorage.setItem("USERNAME", null);
  window.location.reload();
}

//회원가입 요청
export function signup(memberDTO) {
  return call("/member/signup", "POST", memberDTO)
    .then((response) => {
      if (response.id) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      if (error.status === 403) {
        window.location.href = "/signup";
      }
      return Promise.reject(error);
    });
}

//마이페이지 조회
export function mypage(memberDTO) {
  return call("/member/mypage", "POST", memberDTO)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      if (error.status === 403) {
        window.location.href = "/";
      }
      return Promise.reject(error);
    });
}

//메인페이지 조회
export function retrieveMain() {
  return call("/post", "GET", null)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      if (error.status === 403) {
        window.location.href = "/";
      }
      return Promise.reject(error);
    });
}

//모집글 등록
export function postCreate(postDTO) {
  return call("/post", "POST", postDTO)
    .then((response) => {
      if (response.id) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      if (error.status === 403) {
        window.location.href = "/post/postCreate";
      }
      return Promise.reject(error);
    });
}

//모집글 조회
export function retrievePost(postDTO) {
  return call("/post/postView", "POST", postDTO)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Ooops!");
      console.log(error.status);
      console.log("Ooops!");
      if (error.status === 403) {
        window.location.href = "/";
      }
      return Promise.reject(error);
    });
}

//지원 신청
export function appliCreate(appliDTO) {
  return call("/appli", "POST", appliDTO)
    .then((response) => {
      if (response.id) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Ooops!");
      console.log(error.status);
      console.log("Ooops!");
      if (error.status === 403) {
        window.location.href = "/appli/appliCreate";
      }
      return Promise.reject(error);
    });
}

//모집현황 조회
export function retrieveSelect(appliDTO) {
  return call("/appli/selectPerson", "POST", appliDTO)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Ooops!");
      console.log(error.status);
      console.log("Ooops!");
      if (error.status === 403) {
        window.location.href = "/";
      }
      return Promise.reject(error);
    });
}

//모집현황 체크박스
export function checkPerson(appliDTO) {
  return call("/appli", "PUT", appliDTO)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Ooops!");
      console.log(error.status);
      console.log("Ooops!");
      if (error.status === 403) {
        window.location.href = "/";
      }
      return Promise.reject(error);
    });
}

//지원 확정
export function confirmPerson(postDTO) {
  return call("/post", "PUT", postDTO)
    .then((response) => {
      if (response.id) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Ooops!");
      console.log(error.status);
      console.log("Ooops!");
      if (error.status === 403) {
        window.location.reload();
      }
      return Promise.reject(error);
    });
}
