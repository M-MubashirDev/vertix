import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminContext from "./Hooks/AdminContext";
import React, { Suspense } from "react";
import FullPageSpinner from "./UI/Spinner";

// Lazy-loaded components
const Home = React.lazy(() => import("./Pages/Home"));
const Admin = React.lazy(() => import("./Pages/Admin"));
const View = React.lazy(() => import("./Pages/View"));
const PageNotFound = React.lazy(() => import("./Pages/PageNotFound"));
const Login = React.lazy(() => import("./Pages/Login"));
const Edit = React.lazy(() => import("./Pages/Edit"));
const Packages = React.lazy(() => import("./Pages/Packages"));
const ViewAdmin = React.lazy(() => import("./Pages/ViewAdmin"));
const RegisterUserDetails = React.lazy(
  () => import("./Pages/RegisterUserDetails")
);
const CreateStations = React.lazy(() => import("./Pages/CreateStations"));

// Full-screen spinner

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<FullPageSpinner />}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminContext>
                    <Layout />
                  </AdminContext>
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="admin" element={<Admin />} />
              <Route path="view/:adminId" element={<View />}>
                <Route index element={<ViewAdmin />} />
                <Route path="services/:stationId" element={<Packages />} />
                <Route
                  path="registerUsers/:stationId"
                  element={<RegisterUserDetails />}
                />
                <Route path="stations" element={<CreateStations />} />
              </Route>
              <Route path="edit/:adminId" element={<Edit />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#263E4D",
              color: "#FFFFFF",
              border: `1px solid #1A2834`,
            },
            success: {
              duration: 3000,
              style: {
                background: "#3B4D61",
                color: "#FFFFFF",
              },
              iconTheme: {
                primary: "green",
                secondary: "#FFFFFF",
              },
            },
            error: {
              duration: 5000,
              style: {
                background: "#4B3832",
                color: "#FFFFFF",
              },
              iconTheme: {
                primary: "#DC2626",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
