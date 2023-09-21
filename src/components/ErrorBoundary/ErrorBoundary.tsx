import DisplayError from "components/DisplayError/DisplayError";
import React, { useState, useEffect } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  // This useEffect will catch errors in the child components
  useEffect(() => {
    const handleErrors = (error: ErrorEvent) => {
      console.error("Error:", error);
      setHasError(true);
    };

    window.addEventListener("error", handleErrors);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("error", handleErrors);
    };
  }, []);

  if (hasError) {
    // You can render a custom error message or UI here
    return (
      <DisplayError title="Something went wrong">
        <p className="mt-5 text-lg">
          Please refresh the page or try again later.
        </p>
      </DisplayError>
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
