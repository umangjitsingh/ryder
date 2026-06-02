"use client"

import React from 'react'
import VehicleSlider from "@/app/(web)/components/VehicleSlider";
import AuthForm from "@/app/(web)/components/AuthForm";
import Hero from "@/app/(web)/components/Hero";
import {useSelector} from "react-redux";
import {selectIsModalOpen} from "@/app/redux/modalSlice";
import {selectUser} from "@/app/redux/userSlice";
import Footer from "@/app/(web)/components/Footer";



const PublicHome = () => {
		const user=useSelector(selectUser);

		console.log("user===>",user)

	const isModalOpen = useSelector(selectIsModalOpen);

	return (
		<div>
			<Hero/>
			<VehicleSlider/>
			<AuthForm />
				<Footer/>
		</div>
	)
}
export default PublicHome

/*
============================================================================
  PERFORMANCE OPTIMIZATION RECOMMENDATIONS - PublicHome.tsx
============================================================================

⚠️ CRITICAL ISSUE:

1. UNNECESSARY CLIENT COMPONENT:
   - PublicHome has NO client-side interactivity
   - Only reads from Redux (user, isModalOpen) but doesn't use them effectively
   - The console.log("user===>", user) is debug code that should be removed
   - IMPROVEMENT: Convert to Server Component

HOW TO CONVERT TO SERVER COMPONENT:

```typescript
// Remove "use client"
// Remove Redux imports
// Remove useSelector calls

import Hero from "@/app/(web)/components/Hero";
import VehicleSlider from "@/app/(web)/components/VehicleSlider";
import Footer from "@/app/(web)/components/Footer";

// AuthForm should be dynamically imported (client-only)
import dynamic from 'next/dynamic';
const AuthForm = dynamic(() => import('./AuthForm'), { ssr: false });

const PublicHome = () => {
  return (
    <div>
      <Hero />
      <VehicleSlider />
      <AuthForm />
      <Footer />
    </div>
  );
};

export default PublicHome;
```

BENEFITS:
- Eliminates ~30KB client JavaScript
- Better SEO (content in HTML)
- Faster initial page load
- No hydration needed

REMAINING ISSUES:

2. UNUSED REDUX SELECTORS:
   - user is selected but never used in JSX
   - isModalOpen is selected but never used in JSX
   - AuthForm manages its own modal state internally
   - IMPROVEMENT: Remove these selectors

3. DEBUG CODE IN PRODUCTION:
   - console.log("user===>", user) should be removed
   - IMPROVEMENT: Use proper logging library or remove entirely
   - Debug logs increase bundle size and slow down rendering

4. LAZY LOAD AUTHFORM:
   - AuthForm is only visible when user clicks Sign In/Register
   - IMPROVEMENT: Dynamic import with ssr: false
   - const AuthForm = dynamic(() => import('./AuthForm'), { ssr: false });
   - Saves ~15KB initial bundle

5. COMPONENT COMPOSITION:
   - All components render sequentially
   - IMPROVEMENT: Add Suspense boundaries for streaming
   - <Suspense fallback={<HeroSkeleton />}><Hero /></Suspense>
   - Improves Time to First Byte (TTFB)

============================================================================
*/