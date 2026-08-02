import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.15) {
	const ref = useRef(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.unobserve(node);
				}
			},
			{ threshold, rootMargin: "0px 0px -40px 0px" }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold]);

	return [ref, inView];
}

export function useCountUp(target, active, duration = 1400) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!active) return undefined;
		let frame;
		const start = performance.now();

		const tick = (now) => {
			const progress = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setValue(Math.round(target * eased));
			if (progress < 1) frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [target, active, duration]);

	return value;
}
