import "../styles/PageNotFound.css";

import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const PageNotFound = () => {
  const navigate = useNavigate();

  // handle click event on the back button
  const redirect = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="not-found-container">
      <div className="flex-container">
        <div className="not-found-formatter">
          <h2 className="not-found-heading">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="not-found-title">Sorry, we couldn't find this page.</p>
          <p className="not-found-paragraph-margin">
            But don't worry, you can find plenty of other things on your way
            back.
          </p>
          <div className="button-holder">
            <button onClick={redirect} className="btn-primary">
              <KeyboardBackspaceIcon className="svg-icons" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
