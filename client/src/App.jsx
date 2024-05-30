import { Fragment, lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

//utility imports
import useInitialValues from "./hooks/useInitialValues";
import LazyLoader from "./components/loaders/lazyLoader";

//wrappers
const NavbarWrapper = lazy(() => import("./layout/wrappers/navbarWrapper"));
const MainWrapper = lazy(() => import("./layout/wrappers/mainWrapper"));

//public components
const UnProtectedRoutes = lazy(() => import("./routes/unProtectedRoutes"));
const HomePage = lazy(() => import("./pages/public/homePage"));
const SignupPage = lazy(() => import("./pages/public/signupPage"));
const ForgotPasswordPage = lazy(
  () => import("./pages/public/forgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("./pages/public/resetPasswordPage"),
);

//private components
const ProtectedRoutes = lazy(() => import("./routes/protectedRoutes"));
const ChatsPage = lazy(() => import("./pages/private/chatsPage"));
const ChatPage = lazy(() => import("./pages/private/chatPage"));
const GroupsPage = lazy(() => import("./pages/private/groupsPage"));
const AddFriendsPage = lazy(() => import("./pages/private/addFriendsPage"));
const SentRequestsPage = lazy(() => import("./pages/private/sentRequestsPage"));
const PendingRequestsPage = lazy(
  () => import("./pages/private/pendingRequestsPage"),
);
const ProfilePage = lazy(() => import("./pages/private/profilePage"));
const EditProfilePage = lazy(() => import("./pages/private/editProfilePage"));
const ChangePasswordPage = lazy(
  () => import("./pages/private/changePasswordPage"),
);
const SettingsPage = lazy(() => import("./pages/private/settingsPage"));
const NotificationsPage = lazy(
  () => import("./pages/private/notificationsPage"),
);
const GeneralRoomChatPage = lazy(
  () => import("./pages/private/generalRoomChatPage"),
);
const FriendsPage = lazy(() => import("./pages/private/friendsPage"));
const BlockedUsersPage = lazy(() => import("./pages/private/blockedUsersPage"));
const FriendProfilePage = lazy(
  () => import("./pages/private/friendProfilePage"),
);

//error component
const ErrorPage = lazy(() => import("./pages/public/errorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <UnProtectedRoutes>
          <NavbarWrapper />
        </UnProtectedRoutes>
      </Suspense>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password/:userId/:resetToken",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <ProtectedRoutes>
          <MainWrapper />
        </ProtectedRoutes>
      </Suspense>
    ),
    children: [
      { path: "/admin", index: true, element: <ChatsPage /> },
      { path: "/admin/notifications", element: <NotificationsPage /> },
      { path: "/admin/rooms", element: <GroupsPage /> },
      { path: "/admin/profile", element: <ProfilePage /> },
      { path: "/admin/edit-profile", element: <EditProfilePage /> },
      { path: "/admin/change-password", element: <ChangePasswordPage /> },
      { path: "/admin/settings", element: <SettingsPage /> },
      { path: "/admin/add-friends", element: <AddFriendsPage /> },
      { path: "/admin/sent-requests", element: <SentRequestsPage /> },
      { path: "/admin/pending-requests", element: <PendingRequestsPage /> },
      { path: "/admin/friends", element: <FriendsPage /> },
      { path: "/admin/blocked-users", element: <BlockedUsersPage /> },
      {
        path: "/admin/profile/:friendId",
        element: <FriendProfilePage />,
      },
    ],
  },
  {
    path: "/friend-chat/:friendId",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <ProtectedRoutes>
          <ChatPage />
        </ProtectedRoutes>
      </Suspense>
    ),
  },
  {
    path: "/generalroom-chat",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <ProtectedRoutes>
          <GeneralRoomChatPage />
        </ProtectedRoutes>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);

// App component function
const App = () => {
  //get data from cookies
  const { fetchDataFromCookies } = useInitialValues(
    "darkmode",
    "jwt_token",
    "chatLoom_userId",
    "chatLoom_userName",
    "chatLoom_userEmail",
    "chatLoom_userProfilePicture",
  );

  useEffect(() => {
    fetchDataFromCookies();
  }, [fetchDataFromCookies]);

  return (
    <Fragment>
      <Toaster
        richColors={true}
        closeButton={true}
        style={{ fontFamily: "Raleway" }}
      />
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default App;
