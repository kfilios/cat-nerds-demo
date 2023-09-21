import { DisplayError } from "components";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorView = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<DisplayError title={`Error status ${error.status}`}>
				<p>{error.statusText}</p>
				{error.data?.message && (
					<p>
						<i>{error.data.message}</i>
					</p>
				)}
			</DisplayError>
		);
	} else if (error instanceof Error) {
		return (
			<DisplayError title="Unexpected Error">
				<p>Something went wrong.</p>
				<p>
					<i>{error.message}</i>
				</p>
			</DisplayError>
		);
	} else {
		return <></>;
	}
};

export default ErrorView;
