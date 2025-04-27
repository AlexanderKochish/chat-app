import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const SignUp = lazy(() => import("../pages/auth/sign-up/SignUp"));
const SignIn = lazy(() => import("../pages/auth/sign-in/SignIn"));
const Chat = lazy(() => import("../pages/chats/Chat"));
import Spinner from "../components/ui/Spinner/Spinner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <Chat />
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<Spinner />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<Spinner />}>
        <SignIn />
      </Suspense>
    ),
  },
]);
