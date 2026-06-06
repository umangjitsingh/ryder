"use client"

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
			<div className="max-w-md w-full text-center space-y-6">
				{/* Error Icon */}
				<div className="flex justify-center">
					<div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10 text-red-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
							/>
						</svg>
					</div>
				</div>

				{/* Error Message */}
				<div className="space-y-2">
					<h2 className="text-2xl font-semibold text-white">
						Something went wrong
					</h2>
					<p className="text-gray-400 text-sm">
						An unexpected error occurred. Please try again.
					</p>
				</div>

				{/* Error Details (only in development) */}
				{process.env.NODE_ENV === "development" && error.message && (
					<div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 text-left">
						<p className="text-red-300 text-xs font-mono wrap-break-word">
							{error.message}
						</p>
					</div>
				)}

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<button
						onClick={reset}
						className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
					>
						Try Again
					</button>
					<button
						onClick={() => (window.location.href = "/")}
						className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 font-medium rounded-lg transition-all duration-200 cursor-pointer"
					>
						Go Home
					</button>
				</div>
			</div>
		</div>
	)
}
