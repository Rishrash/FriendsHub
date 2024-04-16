import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import UpdateUserProfile from "./components/UserProfile/UpdateUserProfile/UpdateUserProfile.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import PostDetail from "./components/Post/PostDetail/PostDetail.jsx";
import DisplayFriendRequest from "./components/ManageFriendRequest/DisplayFriendRequest/DisplayFriendRequest.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DisplayUserProfile from "./components/UserProfile/DisplayUserProfile/DisplayUserProfile.jsx";
import Search from "./components/Search/Search.jsx";
import ManagePost from "./components/Admin/ManagePost/ManagePost.jsx";
import ManageUser from "./components/Admin/ManageUser/ManageUser.jsx";
import Chat from "./pages/Chat/Chat.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path='/chat' element={ <Chat /> } />
      <Route path="/postDetail/:postId" element={<PostDetail />} />
      <Route path="updateUserProfile/:userId" element={<UpdateUserProfile />} />
      <Route
        path="/displayUserProfile/:userId"
        element={<DisplayUserProfile />}
      />

      <Route path="/admin/manageUser" element={<ManageUser />} />
      <Route path="/admin/managePost" element={<ManagePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/displayFriendRequest/:userId"
        element={<DisplayFriendRequest />}
      />

      {/* <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
