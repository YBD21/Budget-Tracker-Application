import CancelIcon from "@mui/icons-material/Cancel";

const DeleteBudgetPopup = ({ onChild, deteteData }) => {
  // Type , Amount , Title , Reoccure , Date

  const typeOptions = ["Income", "Expense"];
  const reoccurringOptions = ["Monthly", "One Time"];

  const { id, data } = deteteData;

  const textColorOfType =
    data?.Type === typeOptions[2] ? "text-red-600" : "text-green-600";

  const textColorOfReoccure =
    data?.Reoccure === reoccurringOptions[2]
      ? "text-lime-800"
      : "text-amber-800";

  const amount = +data?.Amount;

  const close = () => {
    onChild(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto bg-white rounded-lg sm:max-w-3xl sm:p-5 min-h-[20vh]">
        {/* View Single Budget */}
        <div className="flex justify-between mt-12 mb-5 rounded-md items-center text-center">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-3">
                  ID
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-10">
                  Date
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Title
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Type
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Reoccure
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Amount
                </th>
              </tr>
            </thead>
            {/* Row */}
            <tbody className="text-center">
              <tr key={id}>
                <td className="border px-4 py-2.5 font-bold">{id}</td>
                <td className="border px-4 py-2.5">{data?.Date}</td>
                <td className="border px-4 py-2.5">{data?.Title}</td>
                <td
                  className={`border px-4 py-2.5 font-semibold ${textColorOfType}`}
                >
                  {data?.Type}
                </td>
                <td
                  className={`border px-4 py-2.5 font-semibold ${textColorOfReoccure}`}
                >
                  {data?.Reoccure}
                </td>

                <td className={`border px-4 py-2.5 font-semibold`}>
                  Rs.
                  {amount.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
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
