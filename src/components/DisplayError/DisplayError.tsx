import { ReactNode } from "react";
import error from "images/error.svg";

interface Props {
	title?: string;
	children: ReactNode | string;
}

const DisplayError = ({ title, children }: Props) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
				backgroundColor: "#444",
				minHeight: "100vh",
				color: "#fff"
			}}
		>
			<img width={200} src={error} alt="error" />
			{title && <h1>{title}</h1>}
			{children}
		</div>
	);
};

export default DisplayError;
