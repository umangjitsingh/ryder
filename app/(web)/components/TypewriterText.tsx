import { motion, Variants, Transition } from "framer-motion";

export const Typewriter = ({ text }: { text: string }) => {
		const characters = text.split("");

		const containerVariants: Variants = {
				hidden: { opacity: 0 },
				visible: (i = 1) => ({
						opacity: 1,
						transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
				}),
		};


		const childVariants: Variants = {
				hidden: {
						opacity: 0,
						y: 20,
						color: "#e12b1b", // normal color
				},
				visible: {
						opacity: 1,
						y: 0,
						color: ["#a0e11e", "#e12b1b"], // darker → normal
						transition: {
								y: {
										type: "spring",
										damping: 12,
										stiffness: 100,
								},
								opacity: { duration: 0.2 },
								color: {
										duration: 1,
										ease: "easeOut",
								},
						},
				},
		};


		return (
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				style={{ display: "flex", overflow: "hidden" }}
			>
					{characters.map((char, index) => (
						<motion.span variants={childVariants} key={index}>
								{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
			</motion.div>
		);
};
