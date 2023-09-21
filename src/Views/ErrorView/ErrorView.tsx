import { DisplayError } from "components";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorView = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <DisplayError title={`Error status ${error.status}`}>
        <p className="mt-5 text-lg">{error.statusText}</p>
        {error.data?.message && (
          <p className="mt-5 text-lg">{error.data.message}</p>
        )}
      </DisplayError>
    );
  } else if (error instanceof Error) {
    return (
      <DisplayError title="Unexpected Error">
        <p className="mt-5 text-lg">{error.message}</p>
      </DisplayError>
    );
  } else {
    return <></>;
  }
};

export default ErrorView;
