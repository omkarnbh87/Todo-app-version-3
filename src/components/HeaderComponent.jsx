import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function HeaderComponent() {
  //const authContext = useContext(AuthContext);
  const authContext = useAuth();

  console.log(authContext);

  function logout() {
    authContext.logout();
  }

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="#">
              Nbh Place
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item fs-5">
                  {authContext.isAuthenticated && (
                    <Link className="nav-link" to="/welcome/Omkarnbh87">
                      Home
                    </Link>
                  )}
                </li>
                <li className="nav-item fs-5">
                  {authContext.isAuthenticated && (
                    <Link className="nav-link" to="/todos">
                      Todos
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item fs-5">
                {!authContext.isAuthenticated && (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item fs-5">
                {authContext.isAuthenticated && (
                  <Link className="nav-link" to="/logout" onClick={logout}>
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
