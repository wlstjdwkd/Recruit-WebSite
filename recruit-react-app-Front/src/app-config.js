let backendHost;

const hostname = window && window.location && window.location.hostname;

console.log("hostname", hostname);

if (hostname === "localhost") {
  backendHost = "http://localhost:8081";
}

export const API_BASE_URL = `${backendHost}`;
