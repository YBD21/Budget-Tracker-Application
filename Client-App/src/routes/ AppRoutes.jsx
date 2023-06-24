import AccessOnceRoute from "./AccessOnceRoute";

const AppRoutes = () => {
  const role = "";

  switch (role) {
    // case "Client":
    //   return <ClientRoute />;

    default:
      return <AccessOnceRoute />;
  }
};

export default AppRoutes;
