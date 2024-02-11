import { apiClient } from "./ApiClient";
// export function RetrirveHelloWorldBean() {
//   return axios.get("http://localhost:8080/hello-world-bean");
// }

export const RetrirveHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const RetrirveHelloWorldBeanPathVariable = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`);

export const ExecuteBasicAuthenticationService = (token) =>
  apiClient.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });
