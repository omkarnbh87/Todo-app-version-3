/* eslint-disable react/prop-types */
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListTodosComponent from "./ListTodosComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  return <Navigate to="/" />;
}

export default function TodoApp() {
  return (
    <>
      <div className="TodoApp">
        <AuthProvider>
          <BrowserRouter>
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/login" element={<LoginComponent />} />

              <Route
                path="/welcome/:username"
                element={
                  <AuthenticatedRoute>
                    <WelcomeComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<ErrorComponent />} />
              <Route
                path="/todos"
                element={
                  <AuthenticatedRoute>
                    <ListTodosComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/todos/:id"
                element={
                  <AuthenticatedRoute>
                    <TodoComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/logout"
                element={
                  <AuthenticatedRoute>
                    <LogoutComponent />
                  </AuthenticatedRoute>
                }
              />
            </Routes>
            <FooterComponent />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}
