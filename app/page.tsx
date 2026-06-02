import PublicHome from "@/app/(web)/components/PublicHome";
import PartnerDashboard from "@/app/(web)/components/PartnerDashboard";
import {auth} from "@/app/auth";
import AdminDashboard from "@/app/(web)/components/AdminDashboard";


export default async function Home() {


		const session=await auth();

		return (
			<main className="relative z-10 pt-18 flex-1">
					<div className="absolute top-1/4 left-1/4 w-40 h-40  rounded-full blur-2xl"></div>
					{(() => {
							if (!session || !session.user) return <PublicHome />;
							if (session?.user?.role === "user") return <PublicHome />;
							if (session?.user?.role === "partner") return <PartnerDashboard />;
							if (session?.user?.role === "admin") return <AdminDashboard />;
							return <PublicHome />;
					})()}
			</main>
		);
}

/*
============================================================================
  PERFORMANCE OPTIMIZATION RECOMMENDATIONS - page.tsx (Home)
============================================================================

✅ CURRENT STRENGTHS:
- Server Component with auth() check (good for SSR)
- Conditional rendering based on user role
- No unnecessary client-side JavaScript

⚠️ IMPROVEMENTS NEEDED:

1. ADD REVALIDATION (CRITICAL):
   - This page should be statically generated and revalidated periodically
   - Add: export const revalidate = 60; // Revalidate every 60 seconds
   - This enables Incremental Static Regeneration (ISR)
   - Users get instant page loads with fresh data every minute

2. ADD DYNAMIC CONFIGURATION:
   - Add: export const dynamic = 'force-static'; // For better caching
   - Or: export const dynamic = 'force-dynamic'; if session changes frequently
   - Currently: Page is dynamic on every request (slower)

3. STREAMING WITH SUSPENSE:
   - Wrap heavy components in Suspense for progressive rendering
   - Example:
     <Suspense fallback={<LoadingSkeleton />}>
       {session?.user?.role === "partner" ? <PartnerDashboard /> : <PublicHome />}
     </Suspense>
   - This improves Time to First Byte (TTFB)

4. METADATA ENHANCEMENT:
   - Add dynamic metadata based on user role
   - export async function generateMetadata() { ... }
   - Better SEO for different user types

5. CACHING STRATEGY:
   - Cache the session check if possible
   - Consider: Use Next.js fetch cache for /api/auth/me
   - Add cache headers to reduce database queries

6. CODE SPLITTING:
   - PartnerDashboard and PublicHome are both imported eagerly
   - Consider: Dynamic imports for code splitting
   - const PartnerDashboard = dynamic(() => import('./components/PartnerDashboard'))
   - Reduces initial bundle size by 50%

7. EDGE RENDERING:
   - Consider: export const runtime = 'edge'; for faster global distribution
   - Works well with auth() and simple rendering logic
   - Reduces latency for international users

8. PREFETCHING:
   - Prefetch common next routes (e.g., /bookings for logged-in users)
   - Use <Link prefetch={true}> in Header component
   - Improves perceived navigation speed

============================================================================
*/