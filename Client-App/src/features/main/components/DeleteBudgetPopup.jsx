import CancelIcon from "@mui/icons-material/Cancel";

const DeleteBudgetPopup = ({ onChild, deteteData }) => {
  // Type , Amount , Title , Reoccure , Date

  const typeOptions = ["Income", "Expense"];
  const reoccurringOptions = ["Monthly", "One Time"];

  const { id, data } = deteteData;

  const textColorOfType =
    data?.Type === typeOptions[1] ? "text-red-600" : "text-green-600";

  const textColorOfReoccure =
    data?.Reoccure === reoccurringOptions[1]
      ? "text-lime-800"
      : "text-amber-800";

  const amount = +data?.Amount;

  const close = () => {
    onChild(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto bg-white rounded-lg sm:max-w-2xl sm:p-5 min-h-[20vh]">
        {/* View Single Budget */}
        <div className="flex flex-col gap-5 text-center">
          <h3 className="text-black font-semibold text-lg">
            Are you sure you want to delete this ?
          </h3>
        </div>

        <div className="flex justify-between my-4 rounded-md items-center text-center">
          <table className="table-auto w-full">
            <tbody className="text-center">
              <tr key={id}>
                <td className="border px-4 py-2.5 font-bold bg-gray-100">ID</td>
                <td className="border px-4 py-2.5 font-semibold">{id}</td>
              </tr>
              <tr key={data.Date}>
                <td className="border px-4 py-2.5 font-bold bg-gray-100">
                  Date
                </td>
                <td className="border px-4 py-2.5">{data.Date}</td>
              </tr>
              <tr key={data.Title}>
                <td className="border px-4 py-2.5 font-bold bg-gray-100">
                  Title
                </td>
                <td className="border px-4 py-2.5">{data.Title}</td>
              </tr>
              <tr key={data.Type}>
                <td className="border px-4 py-2.5 font-bold bg-gray-100">
                  Type
                </td>
                <td
                  className={`border px-4 py-2.5 font-semibold ${textColorOfType}`}
                >
                  {data.Type}
                </td>
              </tr>
              <tr key={data.Reoccure}>
                <td className="border px-4 py-2.5 font-bold bg-gray-100">
                  Reoccure
                </td>
                <td
                  className={`border px-4 py-2.5 font-semibold ${textColorOfReoccure}`}
                >
                  {data.Reoccure}
                </td>
              </tr>
              <tr key={amount}>
                <td className="border px-4 py-2.5 font-bold bg-gray-100">
                  Amount
                </td>
                <td className="border px-4 py-2.5 font-semibold">
                  Rs.
                  {amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="absolute top-0 right-0 m-5" onClick={close}>
          <CancelIcon className="svg-icons text-red-900" />
        </button>
      </div>
    </div>
  );
};

export default DeleteBudgetPopup;
