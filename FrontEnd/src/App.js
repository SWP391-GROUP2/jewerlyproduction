import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) =>
          route.path.includes("/customer") ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="customer">{route.element}</ProtectedRoute>
              }
            />
          ) : route.path.includes("/admin") ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="admin">{route.element}</ProtectedRoute>
              }
            />
          ) : route.path.includes("/salestaff") ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="salestaff">
                  {route.element}
                </ProtectedRoute>
              }
            />
          ) : route.path.includes("/designstaff") ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="designstaff">
                  {route.element}
                </ProtectedRoute>
              }
            />
          ) : route.path.includes("/manager") ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="manager">{route.element}</ProtectedRoute>
              }
            />
          ) : route.path.includes("/productionstaff") ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="productionstaff">
                  {route.element}
                </ProtectedRoute>
              }
            />
          ) : (
            <Route key={index} path={route.path} element={route.element} />
          )
        )}
      </Routes>
    </Router>
  );
}

export default App;
