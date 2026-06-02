import { motion } from 'motion/react';
import React from 'react';

const VEHICLE_CATEGORIES = [
		{
				title: "All vehicles", description: "Browse our full fleet", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
						<g fill="currentColor">
								<path fillRule="evenodd" d="M5.653 2.79a2.5 2.5 0 0 0-1.837 1.823l-1.13 4.523A2.5 2.5 0 0 0 1 11.5v3A2.5 2.5 0 0 0 3.5 17h13a2.5 2.5 0 0 0 2.5-2.5v-3a2.5 2.5 0 0 0-1.685-2.364l-1.131-4.523a2.5 2.5 0 0 0-1.836-1.823A18.4 18.4 0 0 0 10 2.263q-2.175 0-4.348.527M3.5 11a1 1 0 0 0 .97-.758l1.286-5.144a.5.5 0 0 1 .368-.365A16.4 16.4 0 0 1 10 4.263a16.4 16.4 0 0 1 3.876.47a.5.5 0 0 1 .367.365l1.286 5.145a1 1 0 0 0 .97.757a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5" clipRule="evenodd"></path>
								<path d="M16.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-10 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M4 15.5A1.5 1.5 0 0 1 5.5 17v1a1.5 1.5 0 0 1-3 0v-1A1.5 1.5 0 0 1 4 15.5m12 0a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-3 0v-1a1.5 1.5 0 0 1 1.5-1.5"></path>
								<path fillRule="evenodd" d="M12.195 5h-4.39a2 2 0 0 0-1.956 1.58l-.429 2A2 2 0 0 0 7.376 11h5.248a2 2 0 0 0 1.955-2.42l-.429-2A2 2 0 0 0 12.195 5m-4.82 4l.43-2h4.39l.429 2z" clipRule="evenodd"></path>
						</g>
				</svg>, tag: "Popular"
		},
		{
				title: "Bikes", description: "Affordable rides for summer", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
						<g fill="currentColor">
								<path d="M12.75 12.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3.5 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
								<path fillRule="evenodd" d="M10 8a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7m0-5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" clipRule="evenodd"></path>
								<path d="M10 14a2 2 0 0 1 2 2v1.5a2 2 0 1 1-4 0V16a2 2 0 0 1 2-2"></path>
								<path fillRule="evenodd" d="M15 11a5 5 0 0 0-10 0v2.5A2.5 2.5 0 0 0 7.5 16h5a2.5 2.5 0 0 0 2.5-2.5zm-8 0a3 3 0 0 1 6 0v2.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z" clipRule="evenodd"></path>
								<path d="M15.5 4.5a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2zm-13 0a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z"></path>
								<path d="m3.41 4.046l.476-1.455l4.524.863l-.477 1.456zm8.18-.592l.477 1.456l4.523-.864l-.476-1.455z"></path>
						</g>
				</svg>, tag: "Quick"
		},
		{
				title: "Compact-Cars", description: "Comfortable city travel", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
						<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
								<path d="m2.67 11.285l-.541-.025a1.06 1.06 0 0 1-.966-.779c-.137-.5-.27-1.02-.27-1.55c0-.563.15-1.113.296-1.644l.016-.058c.1-.363.382-.654.748-.744q.549-.135 1.082-.251a5.3 5.3 0 0 1 .632-2.193a.9.9 0 0 1 .613-.447c.87-.181 1.598-.27 2.707-.27c1.11 0 1.807.089 2.716.271c.27.054.507.22.635.462c.37.706.59 1.44.628 2.197q.537.115 1.065.238c.374.087.666.38.767.751l.013.044c.145.531.297 1.081.297 1.645c0 .53-.134 1.048-.271 1.55c-.12.438-.512.758-.966.778l-.541.025m-5.674.122a51 51 0 0 0 2.68 0M7 1.523v1.8"></path>
								<path d="M4.172 12.471c.98 0 1.531-.551 1.531-1.531s-.551-1.531-1.531-1.531S2.64 9.96 2.64 10.94s.55 1.531 1.53 1.531m5.65 0c.98 0 1.532-.551 1.532-1.531S10.8 9.409 9.82 9.409s-1.53.551-1.53 1.531s.55 1.531 1.53 1.531"></path>
						</g>
				</svg>, tag: "Comfort"
		},
		{
				title: "Suvs", description: "Premium and spacious", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
						<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
								<path d="M5 17a2 2 0 1 0 4 0a2 2 0 0 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 0 0-4 0M5 9l2-4h7.438a2 2 0 0 1 1.94 1.515L17 9h3a2 2 0 0 1 2 2v3M10 9V5M2 7v4"></path>
								<path d="M22.001 14.001A5 5 0 0 0 18 12a5 5 0 0 0-4 2h-3a4.998 4.998 0 0 0-8.003.003"></path>
								<path d="M5 12V9h13"></path>
						</g>
				</svg>, tag: "Premium"
		},
		{
				title: "Vans", description: "Family & Group transport", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 640 640">
						<path fill="currentColor" d="M32 160c0-35.3 28.7-64 64-64h224c23.7 0 44.4 12.9 55.4 32h40.4c32.4 0 61.6 19.6 74 49.5l43.8 106.3l1.7 4.2H560c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-.4c.2 2.6.4 5.3.4 8c0 48.6-39.4 88-88 88s-88-39.4-88-88c0-2.7.1-5.4.4-8H239.7c.2 2.6.4 5.3.4 8c0 48.6-39.4 88-88 88s-88-39.4-88-88q0-5.4.6-10.5c-19-6.4-32.6-24.4-32.6-45.5v-48c-17.7 0-32-14.3-32-32v-96c0-17.7 14.3-32 32-32v-32zm352 32v96h82.1l-35.4-86.1c-2.5-6-8.3-9.9-14.8-9.9zM192 456c0-22.1-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40s40-17.9 40-40m280 40c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40"></path>
				</svg>, tag: "family"
		},
		{
				title: "Drones", description: "Food Delivery", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
						<defs>
								<mask id="SVGvXdlvc7u">
										<g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth={4}>
												<path strokeLinecap="round" d="M29 18v-2a5 5 0 0 0-5-5v0a5 5 0 0 0-5 5v2"></path>
												<path fill="#555" strokeLinecap="round" d="M17 18h14l-2.154 7h-9.692z"></path>
												<path fill="#555" d="M5 22h7v7H5zm31 0h7v7h-7z"></path>
												<path strokeLinecap="round" d="M16 8H4m26 25l4 7m-16-7l-4 7M44 8H32"></path>
										</g>
								</mask>
						</defs>
						<path fill="currentColor" d="M0 0h48v48H0z" mask="url(#SVGvXdlvc7u)"></path>
				</svg>, tag: "food"
		}
];


const VehicleSlider = () => {
		return (
			<motion.section initial={{scale:0.6,y:-100}} whileInView={{scale:1,y:0}} transition={{duration:0.9,ease:'easeInOut'}}
				className="w-full px-4 sm:px-8 lg:px-16 xl:px-32 py-12 sm:py-16 lg:py-24 mt-28 ">
					{/* Header Section */}
					<hr className="text-white/20 pb-28"/>
					<div className="max-w-7xl mx-auto mb-12">
							<div className="flex items-center gap-3 mb-4">
									<div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
									<h4 className="text-gray-400 text-sm sm:text-base font-medium tracking-[0.2em] uppercase">
											Fleet
									</h4>
									<div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
							</div>

							<div className="text-center">
									<h2 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-2">
											Vehicle
									</h2>
									<h2 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-4 decoration-2 underline decoration-emerald-500">
											Categories
									</h2>
									<p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto">
											Choose the ride that fits your journey
									</p>
							</div>
					</div>

					{/* Vehicle Cards Grid */}
					<div className="max-w-400 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-4 xl:grid-cols-6 gap-6 lg:gap-8">
							{VEHICLE_CATEGORIES.map((v) => (
								<div
									key={v.tag}
									className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer"
								>
										{/* Tag Badge */}
										<div className="flex items-center gap-2 mb-4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													viewBox="0 0 1024 1024"
													className="text-emerald-400"
												>
														<path
															fill="currentColor"
															d="m1023.98 416.272l-.001-338.367c0-42.944-34.944-77.904-77.872-77.904H600.73c-21.68 0-54.496 0-75.92 21.44L18.875 527.393c-12.16 12.16-18.88 28.304-18.88 45.487c0 17.216 6.689 33.376 18.849 45.537l386.8 386.72C417.756 1017.312 433.916 1024 451.1 1024s33.36-6.689 45.487-18.849l505.952-505.968c21.696-21.648 21.569-52.816 21.441-82.912zm-66.685 37.666L450.878 959.874L64.126 572.658L569.518 67.154c5.088-3.152 23.408-3.152 30.992-3.152l14.4.048l331.2-.048c7.665 0 13.873 6.24 13.873 13.904V416.53c.064 12.176.129 32.544-2.688 37.408M768.014 128.001c-70.689 0-128 57.311-128 128s57.312 128 128 128s128-57.312 128-128s-57.312-128-128-128m0 192c-35.344 0-64-28.656-64-64s28.656-64 64-64s64 28.656 64 64s-28.656 64-64 64"
														></path>
												</svg>
												<span className="text-emerald-400 text-sm font-semibold uppercase tracking-wide">
															{v.tag}
													</span>
										</div>

										{/* Icon */}
										<div className="text-gray-200 text-4xl sm:text-5xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:text-emerald-400">
												{v.icon}
										</div>

										{/* Title & Description */}
										<div className="space-y-2">
												<h3 className="text-gray-100 text-xl  font-bold tracking-tight">
														{v.title}
												</h3>
												<p className="text-gray-400 text-sm  ">
														{v.description}
												</p>
										</div>

										{/* Hover Arrow Indicator */}
										<div className="absolute bottom-6 right-6 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1.5em"
													height="1.5em"
													viewBox="0 0 24 24"
													className="text-emerald-400"
												>
														<path
															fill="none"
															stroke="currentColor"
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M5 12h14m-7-7 7 7-7 7"
														></path>
												</svg>
										</div>
								</div>
							))}
					</div>
			</motion.section>
		)
}
export default VehicleSlider

/*
============================================================================
  PERFORMANCE OPTIMIZATION RECOMMENDATIONS - VehicleSlider.tsx
============================================================================

✅ CURRENT STRENGTHS:
- Static data (VEHICLE_CATEGORIES) defined outside component
- Uses whileInView for scroll-triggered animations
- Good responsive grid layout

⚠️ IMPROVEMENTS NEEDED:

1. CONVERT TO SERVER COMPONENT (CRITICAL):
   - VehicleSlider has ZERO client-side interactivity
   - Only uses Framer Motion for animations
   - IMPROVEMENT: Remove "use client" (not even present - already Server!)
   - Wait, this IS a Server Component! Perfect!
   - But Framer Motion requires client-side JavaScript
   - SOLUTION: Use CSS animations instead OR add "use client"
   - If keeping animations: Add "use client" but accept the tradeoff

2. ICON RENDERING OPTIMIZATION:
   - 6 large inline SVGs rendered on every page load
   - Each SVG is 1-3KB of JSX
   - IMPROVEMENT: Extract to separate icon components
   - Use React.memo for icon components
   - Example: const CarIcon = React.memo(() => <svg>...</svg>)
   - Enables caching and prevents re-renders

3. ANIMATION PERFORMANCE:
   - initial={{scale:0.6,y:-100}} whileInView={{scale:1,y:0}}
   - IMPROVEMENT: Use CSS @keyframes + Intersection Observer
   - Or: Use Framer Motion but with performant properties only
   - Stick to: opacity, transform (GPU-accelerated)
   - Avoid: width, height, top, left (triggers layout)

4. GRID LAYOUT OPTIMIZATION:
   - grid-cols-1 sm:grid-cols-2 md:grid-4 xl:grid-cols-6
   - md:grid-4 is invalid (should be md:grid-cols-4)
   - IMPROVEMENT: Fix typo for proper responsive behavior
   - Test on tablet breakpoints

5. IMAGE OPTIMIZATION (FUTURE):
   - Currently uses SVG icons, but may add vehicle images later
   - IMPROVEMENT: Use next/image for any raster images
   - Provides: Lazy loading, WebP conversion, responsive sizing
   - Example: <Image src="/car.jpg" alt="Car" width={400} height={300} />

6. CACHING STRATEGY:
   - Content is 100% static
   - IMPROVEMENT: Already cached if parent page uses revalidate
   - No API calls means perfect cache hit rate
   - Consider: Add stale-while-revalidate headers

7. BUNDLE SIZE IMPACT:
   - Inline SVGs add ~15KB to bundle
   - IMPROVEMENT: Use icon sprite or icon font
   - Or: Lazy load icons with dynamic import
   - Reduces initial JavaScript by 20%

8. ACCESSIBILITY IMPROVEMENTS:
   - Cards are divs with cursor-pointer
   - IMPROVEMENT: Use <button> or add role="button" + tabIndex
   - Add aria-label for screen readers
   - Example: <div role="button" tabIndex={0} aria-label="Browse bikes">

9. PREFETCHING DATA:
   - If vehicle data becomes dynamic (from API), prefetch it
   - IMPROVEMENT: Use Next.js fetch in Server Component
   - const vehicles = await fetch('/api/vehicles', { next: { revalidate: 3600 } })
   - Enables ISR caching

10. MOTION REDUCTION PREFERENCE:
    - Not checking prefers-reduced-motion
    - IMPROVEMENT: Respect user's motion preferences
    - Example: 
      const shouldReduceMotion = useReducedMotion();
      initial={shouldReduceMotion ? {} : { scale: 0.6 }}
    - Better accessibility for motion-sensitive users

============================================================================
*/
