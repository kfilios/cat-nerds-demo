import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

export const extractRtkError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  if (!error) return "";
  if ("status" in error) {
    let errMsg = "";
    if ("error" in error) errMsg = error.error;
    else if (error?.data) errMsg = JSON.stringify(error?.data);
    return `Error ${errMsg}`;
  } else {
    return `${error.message}`;
  }
};

export const splitItemsToColumns = (
  arr: any[],
  chunkCount: number,
): any[][] => {
  const result: any[][] = [];
  const chunkSize = Math.floor(arr.length / chunkCount);
  let currentIndex = 0;

  for (let i = 0; i < chunkCount; i++) {
    const chunk = arr.slice(currentIndex, currentIndex + chunkSize);
    result.push(chunk);
    currentIndex += chunkSize;
  }

  return result;
};
