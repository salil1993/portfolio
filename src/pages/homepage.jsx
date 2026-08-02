import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import SiteNav from "../components/portfolio/SiteNav";
import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import Skills from "../components/portfolio/Skills";
import Projects from "../components/portfolio/Projects";
import Services from "../components/portfolio/Services";
import Experience from "../components/portfolio/Experience";
import Contact from "../components/portfolio/Contact";
import SiteFooter from "../components/portfolio/SiteFooter";

import INFO from "../data/user";
import SEO from "../data/seo";

import "../components/portfolio/portfolio.css";

const Homepage = () => {
	const location = useLocation();
	const currentSEO = SEO.find((item) => item.page === "home");

	useEffect(() => {
		if (location.hash) {
			const id = location.hash.replace("#", "");
			const el = document.getElementById(id);
			if (el) {
				setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
				return;
			}
		}
		window.scrollTo(0, 0);
	}, [location.hash]);

	return (
		<>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
				<meta name="theme-color" content="#0a0c10" />
			</Helmet>

			<div className="portfolio-page">
				<SiteNav />
				<main className="portfolio-main">
					<Hero />
					<About />
					<Skills />
					<Projects />
					<Services />
					<Experience />
					<Contact />
					<SiteFooter />
				</main>
			</div>
		</>
	);
};

export default Homepage;
