import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const SignUpPage = lazy(() => import("../../pages/auth/SignUpPage"));
const SignInPage = lazy(() => import("../../pages/auth/SignInPage"));
const Chat = lazy(() => import("../../pages/chats/Chat"));
import Spinner from "../../shared/ui/Spinner/Spinner";
import { SocketWrapper } from "../../shared/socket/SocketWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <SocketWrapper>
          <Chat />
        </SocketWrapper>
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<Spinner />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<Spinner />}>
        <SignInPage />
      </Suspense>
    ),
  },
]);
