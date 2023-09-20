import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./App.css";

import logo from "images/logo.svg";
import { useGetItemByIdQuery, useGetItemsQuery } from "api";
import { selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError } from "utils";
import { Error, Loading } from "components";

function App() {
	const { data, error, isLoading, refetch } = useGetItemsQuery();
	const { data: cat } = useGetItemByIdQuery("9hb");
	const loadDataOnInit = useSelector(selectLoadDataOnInit);

	useEffect(() => {
		if (loadDataOnInit) refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Error>{extractRtkError(error)}</Error>;
	}

	if (!data) {
		return <div>No data found.</div>;
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Hello to cat nerds!</p>
				<h2>Cat 9hb is:</h2>
				<p>{cat?.url}</p>
				<h2>Items:</h2>
				<ul>
					{data.map(item => (
						<li key={item.id}>
							{item.id} - {item.url}
						</li>
					))}
				</ul>
			</header>
		</div>
	);
}

export default App;
