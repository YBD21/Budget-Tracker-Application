import { useStateValue } from "../features/main/context/StateProvider";
import AccessOnceRoute from "./AccessOnceRoute";
import ClientRoute from "./ClientRoute";

const AppRoutes = () => {
  // import userData from contexProvider or dataLayer
  const [{ userData }] = useStateValue();
  const role = userData?.role;

  switch (role) {
    case "Client":
      return <ClientRoute />;

    default:
      return <AccessOnceRoute />;
  }
};

export default AppRoutes;
