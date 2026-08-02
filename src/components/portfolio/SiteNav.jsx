import React, { useEffect, useState } from "react";
import INFO from "../../data/user";

const LINKS = [
	{ id: "about", label: "About" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
	{ id: "services", label: "Services" },
	{ id: "experience", label: "Experience" },
	{ id: "contact", label: "Contact" },
];

const SiteNav = () => {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState("home");

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 40);

			const sections = ["home", ...LINKS.map((l) => l.id)];
			let current = "home";
			for (const id of sections) {
				const el = document.getElementById(id);
				if (!el) continue;
				if (el.getBoundingClientRect().top <= 120) current = id;
			}
			setActive(current);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const go = (id) => (e) => {
		e.preventDefault();
		setOpen(false);
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<header className={`pf-nav${scrolled ? " is-scrolled" : ""}`}>
			<div className="pf-nav-inner">
				<a href="#home" className="pf-nav-brand" onClick={go("home")}>
					{INFO.main.brand}
					<span>.</span>
				</a>

				<button
					type="button"
					className="pf-nav-toggle"
					aria-label="Toggle menu"
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					<span />
				</button>

				<ul className={`pf-nav-links${open ? " is-open" : ""}`}>
					<li>
						<a
							href="#home"
							className={active === "home" ? "is-active" : ""}
							onClick={go("home")}
						>
							Home
						</a>
					</li>
					{LINKS.map((link) => (
						<li key={link.id}>
							<a
								href={`#${link.id}`}
								className={active === link.id ? "is-active" : ""}
								onClick={go(link.id)}
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default SiteNav;
