import { Outlet } from "react-router-dom";
import "./LayoutView.css";

import logo from "images/logo.svg";

function LayoutView() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<Outlet />
		</div>
	);
}

export default LayoutView;
