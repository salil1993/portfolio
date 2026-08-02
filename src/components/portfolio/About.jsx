import React from "react";
import INFO from "../../data/user";
import { useCountUp, useInView } from "./hooks";

const Stat = ({ value, suffix, label, active }) => {
	const n = useCountUp(value, active);
	return (
		<div className="pf-stat">
			<div className="pf-stat-value">
				{n}
				{suffix}
			</div>
			<div className="pf-stat-label">{label}</div>
		</div>
	);
};

const About = () => {
	const { about } = INFO;
	const [ref, inView] = useInView();

	return (
		<section className="pf-section" id="about" ref={ref}>
			<div className={`pf-reveal${inView ? " is-visible" : ""}`}>
				<p className="pf-section-label">{about.section}</p>
				<h2 className="pf-heading">
					{about.title} <em>{about.titleItalic}</em>
				</h2>
			</div>

			<div className="pf-about-grid">
				<div
					className={`pf-about-copy pf-reveal pf-reveal-delay-1${
						inView ? " is-visible" : ""
					}`}
				>
					{about.paragraphs.map((p) => (
						<p key={p.slice(0, 24)}>{p}</p>
					))}
				</div>

				<div
					className={`pf-stats pf-reveal pf-reveal-delay-2${
						inView ? " is-visible" : ""
					}`}
				>
					{about.stats.map((stat) => (
						<Stat key={stat.label} {...stat} active={inView} />
					))}
				</div>
			</div>
		</section>
	);
};

export default About;
