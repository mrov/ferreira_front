import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./NotFound";
import Login from "./pages/Login";
import User from "./pages/Users/Users";
import Header from "./components/shared/Header";

import Grid from '@mui/material/Grid';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element: <User/>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Grid container spacing={0}>
      <RouterProvider router={router} />
    </Grid>
  </React.StrictMode>
);