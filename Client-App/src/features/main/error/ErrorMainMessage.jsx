const ErrorMainMessage = ({ message }) => {
  return (
    <div className="flex flex-row my-0.5 ml-1">
      <span className="text-red-600 text-md">{message}</span>
    </div>
  );
};

export default ErrorMainMessage;
