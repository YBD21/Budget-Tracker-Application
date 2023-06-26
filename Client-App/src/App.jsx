import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/ AppRoutes";
import { useStateValue } from "./features/main/context/StateProvider";
import axiosWithBaseURL from "./constants/axiosRoute";
import Loading from "./features/main/components/Loading";

function App() {
  const [{ userData }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  // call backend to set UserData from http-Only Cookies
  const fetchUser = () => {
    axiosWithBaseURL
      .get("/login-system/user-data", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then(function (respond) {
        const data = decodeToken(respond.data);
        // const data = respond.data;
        // console.log(data);
        if (data?.id) {
          dispatch({
            type: "SET_USER",
            userData: data,
          });
        }

        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(function (error) {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    // if userData is empty then fetchUser
    if (userData.length === 0) {
      fetchUser();
    }
  }, []);

  const route = createBrowserRouter([
    {
      path: "*",
      element: <AppRoutes />,
    },
  ]);

  return <>{loading ? <Loading /> : <RouterProvider router={route} />}</>;
}

export default App;
