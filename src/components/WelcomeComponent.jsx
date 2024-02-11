import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { RetrirveHelloWorldBeanPathVariable } from "./api/HelloWorldApiService";

export default function WelcomeComponent() {
  const { username } = useParams();
  console.log(username);
  const [message, setMessage] = useState(null);

  function callHelloWorldRestAPI() {
    // RetrirveHelloWorldBean()
    //   .then((response) => successResponse(response))
    //   .catch((error) => errorResponse(error))
    //   .finally(() => console.log("cleanup"));

    RetrirveHelloWorldBeanPathVariable("Omkar")
      .then((response) => successResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }
  function successResponse(success) {
    console.log(success);
    setMessage(success.data.message);
  }
  function errorResponse(error) {
    console.log(error);
  }
  return (
    <div className="Welcome">
      <h1>Welcome in Todo Management App</h1>
      <div>Welcome {username}</div>
      Manage your todos - <Link to="/todos">Click Here</Link>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestAPI}>
          Call Hello World
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
