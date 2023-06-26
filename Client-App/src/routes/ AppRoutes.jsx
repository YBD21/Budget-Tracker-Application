import AccessOnceRoute from "./AccessOnceRoute";
import ClientRoute from "./ClientRoute";

const AppRoutes = () => {
  const role = "";

  switch (role) {
    case "Client":
      return <ClientRoute />;

    default:
      return <AccessOnceRoute />;
  }
};

export default AppRoutes;
