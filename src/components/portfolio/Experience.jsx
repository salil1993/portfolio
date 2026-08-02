import React from "react";
import INFO from "../../data/user";
import { useInView } from "./hooks";

const Experience = () => {
	const { experience } = INFO;
	const [ref, inView] = useInView();

	return (
		<section className="pf-section" id="experience" ref={ref}>
			<div className={`pf-reveal${inView ? " is-visible" : ""}`}>
				<p className="pf-section-label">{experience.section}</p>
				<h2 className="pf-heading">
					{experience.title} <em>{experience.titleItalic}</em>
				</h2>
			</div>

			<div
				className={`pf-timeline pf-reveal pf-reveal-delay-1${
					inView ? " is-visible" : ""
				}`}
			>
				{experience.items.map((item) => (
					<article className="pf-exp" key={`${item.company}-${item.role}`}>
						<div className="pf-exp-period">{item.period}</div>
						<h3 className="pf-exp-role">{item.role}</h3>
						<div className="pf-exp-company">{item.company}</div>
						<p>{item.description}</p>
					</article>
				))}
			</div>
		</section>
	);
};

export default Experience;
