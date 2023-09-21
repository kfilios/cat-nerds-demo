import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "styles/index.css";

import { store, persistor } from "store";
import { LayoutView, ErrorView, BreedView, HomeView, FavouriteView } from "Views";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutView />,
		errorElement: <ErrorView />,
		children: [
			{
				path: "/",
				element: <HomeView />
			},
			{
				path: "/breed",
				element: <BreedView />
			},
			{
				path: "/favourites",
				element: <FavouriteView />
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
