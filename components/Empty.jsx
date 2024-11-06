export default function Empty({ message = "No products found." }) {
	return (
		<div className="flex items-center justify-center min-h-screen hero bg-base-200">
			<div className="text-center hero-content">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Oops!</h1>
					<p className="py-6">{message}</p>
				</div>
			</div>
		</div>
	);
}
