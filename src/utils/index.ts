import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

export const extractRtkError = (error: FetchBaseQueryError | SerializedError | undefined) => {
	if (!error) return "";
	if ("status" in error) {
		const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
		return `Error ${errMsg}`;
	} else {
		return `${error.message}`;
	}
};
