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
  console.log(options.body);
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        console.log(json);
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
      console.log(response.id);
      //local 스토리지에 토큰 저장
      localStorage.setItem("ACCESS_TOKEN", response.token);
      localStorage.setItem("USERID", response.id);
      localStorage.setItem("USERNAME", response.username);
      //token이 존재하는 경우 메인 페이지로 리디렉트
      window.location.href = "/";
      // console.log(response);
    }
  });
}

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

//모집글 전체 조회
export function postReadAll(postDTO) {}

// //해당 모집글 조회
// export function postRead(postDTO){
//   return call("/post/postView","GET", postDTO)
//   .then((response) =>{
//     if (response.id){
//       window.location.href="/postView/${postId}";
//     }
//   })
// }

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
