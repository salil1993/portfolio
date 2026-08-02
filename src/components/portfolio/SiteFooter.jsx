import React from "react";
import INFO from "../../data/user";

const SiteFooter = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="pf-footer">
			<div className="pf-footer-brand">
				© {year} {INFO.main.name}. All rights reserved.
			</div>
			<div>{INFO.main.tagline}</div>
		</footer>
	);
};

export default SiteFooter;
