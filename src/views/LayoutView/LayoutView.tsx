import { Outlet } from "react-router-dom";

import { Navbar } from "components";

function LayoutView() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-800 px-4">
      <Navbar />
      <div className="mx-auto mt-2 w-full max-w-screen-xl flex-grow rounded-t-lg bg-white p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutView;
