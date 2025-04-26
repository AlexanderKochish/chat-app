import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/auth/sign-up/SignUp";
import SignIn from "../pages/auth/sign-in/SignIn";
import Chat from "../pages/chats/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);
