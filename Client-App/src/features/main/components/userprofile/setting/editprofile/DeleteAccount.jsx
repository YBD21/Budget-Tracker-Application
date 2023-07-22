import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useStateValue } from "../../../../context/StateProvider";
import axiosWithBaseURL from "../../../../../../constants/axiosRoute";

const DeleteAccount = ({ onChild }) => {
  const [{ userData }, dispatch] = useStateValue();
  // Clear userData in ContexAPI
  const clearUserData = () => {
    dispatch({
      type: "SET_USER",
      userData: [],
    });
  };

  const handleDeleteAccount = () => {
    axiosWithBaseURL
      .delete("/user-management/delete-account", {
        withCredentials: true,
      })
      .then((respond) => {
        // console.log(respond.data);
        if (respond.data === true) {
          clearUserData();
        }
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };

  const close = () => {
    onChild(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto bg-white rounded-lg max-w-2xl max-sm:max-w-xs sm:p-5 min-h-[20vh]">
        {/* Start Delete Account */}
        <div className="w-full flex flex-col px-12 max-sm:px-6 py-3 rounded-lg items-center">
          <h3 className="text-2xl font-bold mb-4 mx-28 max-sm:mx-0 text-center text-black">
            Are you sure you want to delete the Account ?
          </h3>
          <div className="w-full flex flex-col mt-2 justify-center text-center">
            <div className="pt-6 pb-10">
              <DeleteForeverIcon className="scale-[3] text-red-900" />
            </div>

            <p className="text-gray-600 mt-2 mx-12 max-sm:mx-1 max-sm:px-2">
              Note : Deleting your account will remove your login credentials,
              but your history will remain intact.
            </p>
            <div className="w-full flex justify-center mt-8 px-24 max-sm:px-0">
              <button
                className="w-full px-5 py-2.5 tracking-wide
                 bg-red-900  rounded-lg text-center mr-2 mb-2
           focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50 active:ring-4 active:ring-red-900 active:ring-opacity-50 overflow-hidden"
                onClick={handleDeleteAccount}
              >
                <span className="text-white font-semibold text-lg ">
                  Delete
                </span>
                <DeleteForeverIcon className="svg-icons text-white ml-6 pb-0.5" />
              </button>
            </div>
          </div>
          {/*End Delete Account */}

          {/* close */}
          <button className="absolute top-0 right-0 m-5" onClick={close}>
            <CancelIcon className="svg-icons max-sm:scale-150 text-neutral-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
