import React from "react";
import INFO from "../../data/user";
import { useInView } from "./hooks";

const Projects = () => {
	const { projects } = INFO;
	const [ref, inView] = useInView();

	return (
		<section className="pf-section" id="projects" ref={ref}>
			<div className={`pf-reveal${inView ? " is-visible" : ""}`}>
				<p className="pf-section-label">{projects.section}</p>
				<h2 className="pf-heading">
					{projects.title} <em>{projects.titleItalic}</em>
				</h2>
			</div>

			<div className="pf-projects-list">
				{projects.items.map((project, i) => (
					<article
						key={project.title}
						className={`pf-project pf-reveal pf-reveal-delay-${
							(i % 4) + 1
						}${inView ? " is-visible" : ""}`}
					>
						<div className="pf-project-meta">
							<span className="pf-project-cat">{project.category}</span>
							<span className="pf-project-tag">{project.tag}</span>
						</div>
						<h3 className="pf-project-title">{project.title}</h3>
						<p className="pf-project-desc">{project.description}</p>
						<div className="pf-project-footer">
							<div className="pf-project-tech">
								{project.tech.map((t) => (
									<span className="pf-chip" key={t}>
										{t}
									</span>
								))}
							</div>
							<div className="pf-project-links">
								{project.live && (
									<a
										href={project.live}
										target="_blank"
										rel="noreferrer"
									>
										Live Demo
									</a>
								)}
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noreferrer"
									>
										GitHub
									</a>
								)}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default Projects;
