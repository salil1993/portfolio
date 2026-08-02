import React, { useState } from "react";
import INFO from "../../data/user";
import { useInView } from "./hooks";

const Contact = () => {
	const { contact, main } = INFO;
	const [ref, inView] = useInView();
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [sent, setSent] = useState(false);

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
		const body = encodeURIComponent(
			`${form.message}\n\n— ${form.name} (${form.email})`
		);
		window.location.href = `mailto:${main.email}?subject=${subject}&body=${body}`;
		setSent(true);
	};

	return (
		<section className="pf-section" id="contact" ref={ref}>
			<div className={`pf-reveal${inView ? " is-visible" : ""}`}>
				<p className="pf-section-label">{contact.section}</p>
				<h2 className="pf-heading">
					{contact.title} <em>{contact.titleItalic}</em>
				</h2>
			</div>

			<div className="pf-contact-grid">
				<div
					className={`pf-reveal pf-reveal-delay-1${
						inView ? " is-visible" : ""
					}`}
				>
					<p className="pf-contact-desc">{contact.description}</p>
					<div className="pf-contact-links">
						{contact.links.map((link) => (
							<div className="pf-contact-link" key={link.label}>
								<span>{link.label}</span>
								<a
									href={link.href}
									target={link.href.startsWith("http") ? "_blank" : undefined}
									rel={
										link.href.startsWith("http")
											? "noreferrer"
											: undefined
									}
								>
									{link.value}
								</a>
							</div>
						))}
					</div>
				</div>

				<form
					className={`pf-form pf-reveal pf-reveal-delay-2${
						inView ? " is-visible" : ""
					}`}
					onSubmit={onSubmit}
				>
					{sent ? (
						<div className="pf-form-success">
							Thanks — message drafted in your email client. I&apos;ll be
							in touch shortly.
						</div>
					) : (
						<>
							<label>
								Name
								<input
									name="name"
									value={form.name}
									onChange={onChange}
									required
									autoComplete="name"
								/>
							</label>
							<label>
								Email
								<input
									type="email"
									name="email"
									value={form.email}
									onChange={onChange}
									required
									autoComplete="email"
								/>
							</label>
							<label>
								Message
								<textarea
									name="message"
									value={form.message}
									onChange={onChange}
									required
								/>
							</label>
							<button type="submit" className="pf-btn pf-btn-primary">
								Send Message
							</button>
						</>
					)}
				</form>
			</div>
		</section>
	);
};

export default Contact;
