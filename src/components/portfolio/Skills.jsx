import React from "react";
import INFO from "../../data/user";
import { useInView } from "./hooks";

const Skills = () => {
	const { skills } = INFO;
	const [ref, inView] = useInView();

	return (
		<section className="pf-section" id="skills" ref={ref}>
			<div className={`pf-reveal${inView ? " is-visible" : ""}`}>
				<p className="pf-section-label">{skills.section}</p>
				<h2 className="pf-heading">
					{skills.title} <em>{skills.titleItalic}</em>
				</h2>
			</div>

			<div className="pf-skills-grid">
				{skills.disciplines.map((d, i) => (
					<article
						key={d.id}
						className={`pf-skill-card pf-reveal pf-reveal-delay-${
							(i % 4) + 1
						}${inView ? " is-visible" : ""}`}
					>
						<div className="pf-skill-id">{d.id}</div>
						<div className="pf-skill-name">{d.name}</div>
						<div className="pf-skill-chips">
							{d.items.map((item) => (
								<span className="pf-chip" key={item}>
									{item}
								</span>
							))}
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default Skills;
