import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useGetItemByIdQuery, useGetItemsQuery } from "api";
import { selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError } from "utils";
import { DisplayError, Loading } from "components";

function HomeView() {
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
		return <DisplayError>{extractRtkError(error)}</DisplayError>;
	}

	if (!data) {
		return <div>No data found.</div>;
	}

	return (
		<>
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
		</>
	);
}

export default HomeView;
