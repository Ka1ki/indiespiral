import { motion } from "framer-motion";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<motion.div
				animate={{
					scale: [1, 2, 2, 1, 1],
					rotate: [0, 0, 270, 270, 0],
					borderRadius: ["20%", "20%", "50%", "50%", "20%"],
				}}
				transition={{
					duration: 2,
					ease: "easeInOut",
					times: [0, 0.2, 0.5, 0.8, 1],
					repeat: Infinity,
					repeatDelay: 1,
				}}
				className="w-16 h-16 bg-primary"
			/>
		</div>
	);
}
