import React, { useEffect, useState } from "react";
import INFO from "../../data/user";

const Hero = () => {
	const { hero, main } = INFO;
	const [roleIndex, setRoleIndex] = useState(0);
	const [elapsed, setElapsed] = useState(0);

	useEffect(() => {
		const clock = setInterval(() => setElapsed((s) => s + 1), 1000);
		const roles = setInterval(() => {
			setRoleIndex((i) => (i + 1) % hero.roles.length);
		}, 2600);
		return () => {
			clearInterval(clock);
			clearInterval(roles);
		};
	}, [hero.roles.length]);

	const seconds = String(elapsed % 60).padStart(2, "0");
	const minutes = String(Math.floor(elapsed / 60) % 60).padStart(2, "0");

	const scrollTo = (href) => (e) => {
		e.preventDefault();
		const id = href.replace("#", "");
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="pf-hero" id="home">
			<div className="pf-hero-meta">
				<span className="dot" aria-hidden="true" />
				<span>
					REC · TAKE 01 · 00:{minutes}:{seconds}
				</span>
			</div>

			<p className="pf-hero-tagline">{main.tagline}</p>
			<h1 className="pf-hero-brand">{main.brand}</h1>

			<div className="pf-hero-roles" aria-live="polite">
				<span key={roleIndex}>{hero.roles[roleIndex]}</span>
			</div>

			<p className="pf-hero-desc">{hero.description}</p>

			<div className="pf-hero-ctas">
				<a
					href={hero.ctaPrimary.href}
					className="pf-btn pf-btn-primary"
					onClick={scrollTo(hero.ctaPrimary.href)}
				>
					{hero.ctaPrimary.label}
				</a>
				<a
					href={hero.ctaSecondary.href}
					className="pf-btn pf-btn-ghost"
					onClick={scrollTo(hero.ctaSecondary.href)}
				>
					{hero.ctaSecondary.label}
				</a>
			</div>

			<div className="pf-hero-scroll">
				<span className="pf-hero-scroll-line" aria-hidden="true" />
				<span>Scroll</span>
			</div>
		</section>
	);
};

export default Hero;
