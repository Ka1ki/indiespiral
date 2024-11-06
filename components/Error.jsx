export default function Error({
	message = "An error occurred while fetching data.",
}) {
	return (
		<div className="flex items-center justify-center min-h-screen shadow-lg">
			<div className="flex flex-col items-center justify-center text-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="flex-shrink-0 w-16 h-16 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{message}</span>
			</div>
		</div>
	);
}
