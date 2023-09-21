import { render, screen } from "@testing-library/react";
import HomeView from "./HomeView";

test("renders learn react link", () => {
	render(<HomeView />);
	const linkElement = screen.getByText(/cat nerds/i);
	expect(linkElement).toBeInTheDocument();
});
