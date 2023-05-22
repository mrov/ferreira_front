import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./NotFound";
import Login from "./pages/Login";
import User from "./pages/Users/Users";

import Grid from '@mui/material/Grid';

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
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