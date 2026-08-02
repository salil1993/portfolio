import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders brand hero", () => {
	render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	expect(screen.getByRole("heading", { level: 1, name: "SALIL" })).toBeInTheDocument();
});
