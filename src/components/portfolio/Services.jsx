import React from "react";
import INFO from "../../data/user";
import { useInView } from "./hooks";

const Services = () => {
	const { services } = INFO;
	const [ref, inView] = useInView();

	return (
		<section className="pf-section" id="services" ref={ref}>
			<div className={`pf-reveal${inView ? " is-visible" : ""}`}>
				<p className="pf-section-label">{services.section}</p>
				<h2 className="pf-heading">
					{services.title} <em>{services.titleItalic}</em>
				</h2>
			</div>

			<div className="pf-services-grid">
				{services.items.map((item, i) => (
					<article
						key={item.id}
						className={`pf-service pf-reveal pf-reveal-delay-${
							(i % 4) + 1
						}${inView ? " is-visible" : ""}`}
					>
						<div className="pf-service-id">{item.id}</div>
						<h3 className="pf-service-title">
							{item.title} <em>{item.titleItalic}</em>
						</h3>
						<p>{item.description}</p>
					</article>
				))}
			</div>
		</section>
	);
};

export default Services;
