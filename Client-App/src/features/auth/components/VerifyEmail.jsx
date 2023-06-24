import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const VerifyEmail = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mb-auto mt-[15%] p-6 bg-white rounded-md lg:max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-black">
          Validate E-Mail
        </h2>
        <p className="text-lg font-semibold text-center text-black mt-3">
          PIN has been sent to email@gmail.com
        </p>
        {/* verify code */}
        <form className="mt-6">
          {/* Code Box */}
          <div className="mb-2">
            <div className="flex flex-row cursor-pointer">
              <input
                type="number"
                placeholder="Enter PIN"
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
              />
            </div>
          </div>
          <div className="w-full mt-6">
            {/* Verify */}
            <div className="min-w-max mt-4">
              <button
                className="w-full px-5 py-2.5  bg-black  rounded-lg  
                text-center mr-3 mb-2
                focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50
                "
              >
                <p className="text-white tracking-wide font-semibold">
                  Submit PIN
                </p>
              </button>
            </div>
            {/* cancel */}
            <div className="min-w-max mt-4">
              <button
                className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg  mr-3 mb-2
                      focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
                      "
              >
                <KeyboardBackspaceIcon className="svg-icons" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
