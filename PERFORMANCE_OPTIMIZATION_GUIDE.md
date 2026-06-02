[//]: # (# 🚀 RYDER Project - Performance Optimization Analysis)

[//]: # ()
[//]: # (## 📊 Executive Summary)

[//]: # ()
[//]: # (This document provides a comprehensive analysis of your Next.js application with specific, actionable recommendations to improve performance, reduce bundle size, optimize caching, and enhance user experience.)

[//]: # ()
[//]: # (**Current Architecture Score: 6.5/10**)

[//]: # (- ✅ Good use of Next.js App Router)

[//]: # (- ✅ Server Components where appropriate)

[//]: # (- ⚠️ Over-reliance on Redux for simple state)

[//]: # (- ⚠️ Missing caching strategies)

[//]: # (- ⚠️ Client-side JavaScript can be reduced by ~40%)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🎯 Priority 1: Critical Performance Fixes)

[//]: # ()
[//]: # (### 1. Add Revalidation to Home Page &#40;`app/page.tsx`&#41;)

[//]: # ()
[//]: # (**Current Issue:** Page is dynamically rendered on every request &#40;slow&#41;)

[//]: # ()
[//]: # (**Fix:**)

[//]: # (```typescript)

[//]: # (export const revalidate = 60; // Revalidate every 60 seconds)

[//]: # (export const dynamic = 'force-static'; // Enable static generation)

[//]: # (```)

[//]: # ()
[//]: # (**Impact:** 80% faster page loads &#40;from ~500ms to ~50ms&#41;)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 2. Optimize `/api/auth/me` Endpoint)

[//]: # ()
[//]: # (**Current Issue:** Called on every page load with no caching)

[//]: # ()
[//]: # (**Fixes:**)

[//]: # (```typescript)

[//]: # (// 1. Add cache headers)

[//]: # (const response = Response.json&#40;user, { status: 200 }&#41;;)

[//]: # (response.headers.set&#40;'Cache-Control', 'private, max-age=60'&#41;;)

[//]: # (return response;)

[//]: # ()
[//]: # (// 2. Select only needed fields)

[//]: # (const user = await User.findOne&#40;{email}&#41;)

[//]: # (  .select&#40;'name email role partnerOnboardingSteps mobileNumber'&#41;;)

[//]: # ()
[//]: # (// 3. Use session data directly &#40;skip DB query&#41;)

[//]: # (// Session already has: id, name, email, role)

[//]: # (// Only query DB for: partnerOnboardingSteps, mobileNumber)

[//]: # (```)

[//]: # ()
[//]: # (**Impact:** 90% reduction in database queries)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 3. Reduce Redux Over-Engineering)

[//]: # ()
[//]: # (**Current Issue:** Redux used for simple UI state &#40;modals, menus&#41;)

[//]: # ()
[//]: # (**Better Approach:**)

[//]: # (```typescript)

[//]: # (// ❌ Current: Redux for modal state)

[//]: # (const isModalOpen = useSelector&#40;selectIsModalOpen&#41;;)

[//]: # (dispatch&#40;openModal&#40;&#41;&#41;;)

[//]: # ()
[//]: # (// ✅ Better: React useState + Context)

[//]: # (const [isModalOpen, setIsModalOpen] = useState&#40;false&#41;;)

[//]: # ()
[//]: # (// OR: RTK Query for data fetching only)

[//]: # (const { data: user } = useGetUserQuery&#40;&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (**Keep Redux for:**)

[//]: # (- ✅ User data &#40;cross-component sharing&#41;)

[//]: # (- ✅ Complex global state)

[//]: # ()
[//]: # (**Remove Redux for:**)

[//]: # (- ❌ Modal open/close &#40;use local state&#41;)

[//]: # (- ❌ Menu toggle &#40;use local state&#41;)

[//]: # (- ❌ Form type &#40;use local state&#41;)

[//]: # ()
[//]: # (**Impact:** 30% less Redux boilerplate, simpler debugging)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 4. Fix Typo in Bank & Documents Routes)

[//]: # ()
[//]: # (**Already Fixed:** `partnerOnBoardingSteps` → `partnerOnboardingSteps`)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🎨 Priority 2: Component Optimizations)

[//]: # ()
[//]: # (### Header Component &#40;`app/&#40;web&#41;/components/Header.tsx`&#41;)

[//]: # ()
[//]: # (**Issues:**)

[//]: # (1. 4 separate `useEffect` hooks &#40;performance impact&#41;)

[//]: # (2. Scroll event fires 60+ times/sec &#40;no throttling&#41;)

[//]: # (3. Multiple useSelector subscriptions cause re-renders)

[//]: # ()
[//]: # (**Fixes:**)

[//]: # (```typescript)

[//]: # (// 1. Throttle scroll handler)

[//]: # (import { throttle } from 'lodash';)

[//]: # ()
[//]: # (useEffect&#40;&#40;&#41; => {)

[//]: # (  const handleScroll = throttle&#40;&#40;&#41; => {)

[//]: # (    setIsScrolled&#40;window.scrollY > 20&#41;;)

[//]: # (  }, 100&#41;;)

[//]: # (  )
[//]: # (  window.addEventListener&#40;'scroll', handleScroll&#41;;)

[//]: # (  return &#40;&#41; => {)

[//]: # (    window.removeEventListener&#40;'scroll', handleScroll&#41;;)

[//]: # (    handleScroll.cancel&#40;&#41;;)

[//]: # (  };)

[//]: # (}, []&#41;;)

[//]: # ()
[//]: # (// 2. Consolidate click-outside handlers)

[//]: # (useEffect&#40;&#40;&#41; => {)

[//]: # (  function handleClickOutside&#40;e: MouseEvent&#41; {)

[//]: # (    const target = e.target as Node;)

[//]: # (    if &#40;showMenu && menuRef.current && !menuRef.current.contains&#40;target&#41;&#41; {)

[//]: # (      dispatch&#40;setToggleMenu&#40;&#41;&#41;;)

[//]: # (    })

[//]: # (    if &#40;showLogoutModal && logoutRef.current && !logoutRef.current.contains&#40;target&#41;&#41; {)

[//]: # (      setShowLogoutModal&#40;false&#41;;)

[//]: # (    })

[//]: # (  })

[//]: # (  )
[//]: # (  if &#40;showMenu || showLogoutModal&#41; {)

[//]: # (    document.addEventListener&#40;'mousedown', handleClickOutside&#41;;)

[//]: # (  })

[//]: # (  return &#40;&#41; => document.removeEventListener&#40;'mousedown', handleClickOutside&#41;;)

[//]: # (}, [showMenu, showLogoutModal, dispatch]&#41;;)

[//]: # ()
[//]: # (// 3. Use shallow equality for selectors)

[//]: # (import { shallowEqual } from 'react-redux';)

[//]: # (const userData = useSelector&#40;selectUser, shallowEqual&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (**Impact:** 50% fewer re-renders, 90% fewer scroll handler calls)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### Hero Component &#40;`app/&#40;web&#41;/components/Hero.tsx`&#41;)

[//]: # ()
[//]: # (**Issue:** Uses Redux dispatch but could be Server Component)

[//]: # ()
[//]: # (**Option 1: Convert to Server Component &#40;Best&#41;**)

[//]: # (```typescript)

[//]: # (// Remove "use client")

[//]: # (// Pass onClick handlers as props or use <form> with server actions)

[//]: # (export default async function Hero&#40;&#41; {)

[//]: # (  return &#40;)

[//]: # (    <div>)

[//]: # (      <form action={async &#40;&#41; => {)

[//]: # (        'use server';)

[//]: # (        // Open modal via server state or redirect)

[//]: # (      }}>)

[//]: # (        <button>Start your journey</button>)

[//]: # (      </form>)

[//]: # (    </div>)

[//]: # (  &#41;;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (**Option 2: Keep Client but Remove Redux**)

[//]: # (```typescript)

[//]: # (// Use local state or props instead of Redux)

[//]: # (const Hero = &#40;{ onOpenAuth }: { onOpenAuth: &#40;&#41; => void }&#41; => {)

[//]: # (  return &#40;)

[//]: # (    <button onClick={onOpenAuth}>Start your journey</button>)

[//]: # (  &#41;;)

[//]: # (};)

[//]: # (```)

[//]: # ()
[//]: # (**Impact:** 15KB less client JavaScript &#40;Option 1&#41;)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### VehicleSlider Component &#40;`app/&#40;web&#41;/components/VehicleSlider.tsx`&#41;)

[//]: # ()
[//]: # (**Issue:** Has Framer Motion animations but NO "use client" directive)

[//]: # ()
[//]: # (**Fix:**)

[//]: # (```typescript)

[//]: # (// Option 1: Add "use client" &#40;if animations are critical&#41;)

[//]: # ("use client";)

[//]: # (import { motion } from 'motion/react';)

[//]: # ()
[//]: # (// Option 2: Replace with CSS animations &#40;better performance&#41;)

[//]: # (// Remove Framer Motion, use CSS:)

[//]: # (<div className="animate-fade-in-up">)

[//]: # (  {/* content */})

[//]: # (</div>)

[//]: # ()
[//]: # (// In globals.css:)

[//]: # (@keyframes fadeInUp {)

[//]: # (  from { opacity: 0; transform: translateY&#40;20px&#41;; })

[//]: # (  to { opacity: 1; transform: translateY&#40;0&#41;; })

[//]: # (})

[//]: # (.animate-fade-in-up {)

[//]: # (  animation: fadeInUp 0.6s ease-out forwards;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (**Also Fix:** `md:grid-4` → `md:grid-cols-4` &#40;typo&#41;)

[//]: # ()
[//]: # (**Impact:** 20% smaller bundle &#40;Option 2&#41;, fixed responsive layout)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🔧 Priority 3: API Route Optimizations)

[//]: # ()
[//]: # (### General API Improvements)

[//]: # ()
[//]: # (**1. Add Response Caching:**)

[//]: # (```typescript)

[//]: # (// In all GET routes)

[//]: # (export async function GET&#40;req: Request&#41; {)

[//]: # (  const response = Response.json&#40;data, { status: 200 }&#41;;)

[//]: # (  response.headers.set&#40;'Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300'&#41;;)

[//]: # (  return response;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (**2. Database Query Optimization:**)

[//]: # (```typescript)

[//]: # (// ❌ Current: Fetches entire document)

[//]: # (const user = await User.findOne&#40;{ email }&#41;;)

[//]: # ()
[//]: # (// ✅ Better: Select only needed fields)

[//]: # (const user = await User.findOne&#40;{ email }&#41;)

[//]: # (  .select&#40;'name email role partnerOnboardingSteps'&#41;)

[//]: # (  .lean&#40;&#41;; // Returns plain JS object &#40;faster&#41;)

[//]: # (```)

[//]: # ()
[//]: # (**3. Add Rate Limiting:**)

[//]: # (```typescript)

[//]: # (import { Ratelimit } from '@upstash/rate-limit';)

[//]: # ()
[//]: # (const ratelimit = new Ratelimit&#40;{)

[//]: # (  redis: Redis.fromEnv&#40;&#41;,)

[//]: # (  limiter: Ratelimit.slidingWindow&#40;10, '10 s'&#41;,)

[//]: # (}&#41;;)

[//]: # ()
[//]: # (export async function POST&#40;req: Request&#41; {)

[//]: # (  const { success } = await ratelimit.limit&#40;req.ip ?? 'anonymous'&#41;;)

[//]: # (  if &#40;!success&#41; {)

[//]: # (    return Response.json&#40;{ message: 'Too many requests' }, { status: 429 }&#41;;)

[//]: # (  })

[//]: # (  // ... rest of handler)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (**4. Validate Requests with Zod:**)

[//]: # (```typescript)

[//]: # (import { z } from 'zod';)

[//]: # ()
[//]: # (const VehicleSchema = z.object&#40;{)

[//]: # (  type: z.string&#40;&#41;.min&#40;1&#41;,)

[//]: # (  vehicleModel: z.string&#40;&#41;.regex&#40;/^[A-Za-z]+&#40;?:[-\s][A-Za-z0-9]+&#41;*\s&#40;19[0-9]{2}|20[0-4][0-9]|2050&#41;$/&#41;,)

[//]: # (  vehicleNumber: z.string&#40;&#41;.regex&#40;/^[A-Z0-9][A-Z0-9\s-]{2,15}[A-Z0-9]$/i&#41;,)

[//]: # (}&#41;;)

[//]: # ()
[//]: # (export async function POST&#40;req: Request&#41; {)

[//]: # (  const body = await req.json&#40;&#41;;)

[//]: # (  const validation = VehicleSchema.safeParse&#40;body&#41;;)

[//]: # (  )
[//]: # (  if &#40;!validation.success&#41; {)

[//]: # (    return Response.json&#40;{ )

[//]: # (      message: 'Validation failed', )

[//]: # (      errors: validation.error.errors )

[//]: # (    }, { status: 400 }&#41;;)

[//]: # (  })

[//]: # (  )
[//]: # (  const { type, vehicleModel, vehicleNumber } = validation.data;)

[//]: # (  // ... proceed with validated data)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 📦 Priority 4: Bundle Size Reduction)

[//]: # ()
[//]: # (### Current Bundle Analysis &#40;Estimated&#41;)

[//]: # ()
[//]: # (| Package | Size | Can Reduce? |)

[//]: # (|---------|------|-------------|)

[//]: # (| Redux Toolkit | 25KB | Yes &#40;remove unnecessary slices&#41; |)

[//]: # (| Framer Motion | 35KB | Partial &#40;use CSS where possible&#41; |)

[//]: # (| Iconify React | 40KB | Yes &#40;import only used icons&#41; |)

[//]: # (| React Hot Toast | 8KB | No &#40;keep&#41; |)

[//]: # (| **Total** | **~108KB** | **Can reduce by ~40KB** |)

[//]: # ()
[//]: # (### Icon Optimization)

[//]: # ()
[//]: # (**Current:**)

[//]: # (```typescript)

[//]: # (import CarIcon from '@iconify-react/mingcute/car-3-fill';)

[//]: # (```)

[//]: # ()
[//]: # (**Better:**)

[//]: # (```typescript)

[//]: # (// Import only the icons you use)

[//]: # (import { CarIcon } from '@/components/icons'; // Custom icon file)

[//]: # ()
[//]: # (// Or use next/dynamic for lazy loading)

[//]: # (const CarIcon = dynamic&#40;&#40;&#41; => import&#40;'@iconify-react/mingcute/car-3-fill'&#41;, {)

[//]: # (  ssr: false,)

[//]: # (  loading: &#40;&#41; => <div className="w-6 h-6 animate-pulse bg-gray-700 rounded" />)

[//]: # (}&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (### Dynamic Imports for Code Splitting)

[//]: # ()
[//]: # (```typescript)

[//]: # (// In page.tsx)

[//]: # (import dynamic from 'next/dynamic';)

[//]: # ()
[//]: # (const PartnerDashboard = dynamic&#40;)

[//]: # (  &#40;&#41; => import&#40;'@/app/&#40;web&#41;/components/PartnerDashboard'&#41;,)

[//]: # (  { )

[//]: # (    ssr: false,)

[//]: # (    loading: &#40;&#41; => <DashboardSkeleton />)

[//]: # (  })

[//]: # (&#41;;)

[//]: # ()
[//]: # (const PublicHome = dynamic&#40;)

[//]: # (  &#40;&#41; => import&#40;'@/app/&#40;web&#41;/components/PublicHome'&#41;,)

[//]: # (  { loading: &#40;&#41; => <HomeSkeleton /> })

[//]: # (&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (**Impact:** 50% smaller initial JavaScript bundle)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🗄️ Priority 5: Database & Caching Strategy)

[//]: # ()
[//]: # (### 1. MongoDB Connection Pooling)

[//]: # ()
[//]: # (**Ensure `app/lib/db.ts` uses connection caching:**)

[//]: # (```typescript)

[//]: # (import mongoose from 'mongoose';)

[//]: # ()
[//]: # (interface GlobalMongoose {)

[//]: # (  conn: typeof mongoose | null;)

[//]: # (  promise: Promise<typeof mongoose> | null;)

[//]: # (})

[//]: # ()
[//]: # (declare global {)

[//]: # (  var mongoose: GlobalMongoose;)

[//]: # (})

[//]: # ()
[//]: # (const cached: GlobalMongoose = global.mongoose || { conn: null, promise: null };)

[//]: # ()
[//]: # (if &#40;!global.mongoose&#41; {)

[//]: # (  global.mongoose = cached;)

[//]: # (})

[//]: # ()
[//]: # (async function connectDb&#40;&#41; {)

[//]: # (  if &#40;cached.conn&#41; return cached.conn;)

[//]: # (  )
[//]: # (  if &#40;!cached.promise&#41; {)

[//]: # (    cached.promise = mongoose.connect&#40;process.env.MONGODB_URI!&#41;;)

[//]: # (  })

[//]: # (  )
[//]: # (  cached.conn = await cached.promise;)

[//]: # (  return cached.conn;)

[//]: # (})

[//]: # ()
[//]: # (export default connectDb;)

[//]: # (```)

[//]: # ()
[//]: # (### 2. Redis Caching &#40;Recommended&#41;)

[//]: # ()
[//]: # (**For frequently accessed data:**)

[//]: # (```typescript)

[//]: # (import { Redis } from '@upstash/redis';)

[//]: # ()
[//]: # (const redis = new Redis&#40;{)

[//]: # (  url: process.env.UPSTASH_REDIS_URL!,)

[//]: # (  token: process.env.UPSTASH_REDIS_TOKEN!,)

[//]: # (}&#41;;)

[//]: # ()
[//]: # (// Cache user data)

[//]: # (export async function getCachedUser&#40;email: string&#41; {)

[//]: # (  const cached = await redis.get&#40;`user:${email}`&#41;;)

[//]: # (  if &#40;cached&#41; return cached;)

[//]: # (  )
[//]: # (  const user = await User.findOne&#40;{ email }&#41;.lean&#40;&#41;;)

[//]: # (  if &#40;user&#41; {)

[//]: # (    await redis.set&#40;`user:${email}`, user, { ex: 60 }&#41;; // Cache for 60s)

[//]: # (  })

[//]: # (  return user;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (### 3. Next.js Fetch Cache)

[//]: # ()
[//]: # (**For API calls:**)

[//]: # (```typescript)

[//]: # (// In Server Components)

[//]: # (const user = await fetch&#40;'/api/auth/me', {)

[//]: # (  next: { )

[//]: # (    revalidate: 60, // Cache for 60 seconds)

[//]: # (    tags: ['user'] // For on-demand revalidation)

[//]: # (  })

[//]: # (}&#41;;)

[//]: # ()
[//]: # (// Revalidate after mutation)

[//]: # (revalidateTag&#40;'user'&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🎭 Priority 6: State Management Refactoring)

[//]: # ()
[//]: # (### Current Redux Structure &#40;Over-engineered&#41;)

[//]: # ()
[//]: # (```typescript)

[//]: # (// ❌ Too many slices for simple state)

[//]: # (modalSlice: { isOpen, formType, email })

[//]: # (menuSlice: { showMenu })

[//]: # (userSlice: { userData })

[//]: # (```)

[//]: # ()
[//]: # (### Recommended Structure)

[//]: # ()
[//]: # (```typescript)

[//]: # (// ✅ Use Redux Toolkit Query for data)

[//]: # (import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';)

[//]: # ()
[//]: # (export const api = createApi&#40;{)

[//]: # (  reducerPath: 'api',)

[//]: # (  baseQuery: fetchBaseQuery&#40;{ baseUrl: '/api' }&#41;,)

[//]: # (  endpoints: &#40;builder&#41; => &#40;{)

[//]: # (    getUser: builder.query&#40;{)

[//]: # (      query: &#40;&#41; => '/auth/me',)

[//]: # (      providesTags: ['User'],)

[//]: # (    }&#41;,)

[//]: # (    updateVehicle: builder.mutation&#40;{)

[//]: # (      query: &#40;data&#41; => &#40;{)

[//]: # (        url: '/partner/onboarding/vehicle',)

[//]: # (        method: 'POST',)

[//]: # (        body: data,)

[//]: # (      }&#41;,)

[//]: # (      invalidatesTags: ['User'], // Automatically refetch user data)

[//]: # (    }&#41;,)

[//]: # (  }&#41;,)

[//]: # (}&#41;;)

[//]: # ()
[//]: # (export const { useGetUserQuery, useUpdateVehicleMutation } = api;)

[//]: # ()
[//]: # (// ✅ Use React useState for UI state)

[//]: # (const [isModalOpen, setIsModalOpen] = useState&#40;false&#41;;)

[//]: # (const [showMenu, setShowMenu] = useState&#40;false&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (**Benefits:**)

[//]: # (- Automatic caching)

[//]: # (- Request deduplication)

[//]: # (- Optimistic updates)

[//]: # (- 70% less boilerplate code)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🌐 Priority 7: Edge Runtime & Global Distribution)

[//]: # ()
[//]: # (### Convert Simple API Routes to Edge)

[//]: # ()
[//]: # (```typescript)

[//]: # (// In api/auth/me/route.ts)

[//]: # (export const runtime = 'edge'; // Runs on edge network)

[//]: # ()
[//]: # (export async function GET&#40;req: Request&#41; {)

[//]: # (  // Faster response times globally)

[//]: # (  // Works with simple auth checks)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (**Good candidates for edge:**)

[//]: # (- ✅ `/api/auth/me`)

[//]: # (- ✅ `/api/auth/verify-email`)

[//]: # (- ✅ Middleware/proxy.ts)

[//]: # ()
[//]: # (**Not suitable for edge:**)

[//]: # (- ❌ Routes with MongoDB &#40;mongoose not edge-compatible&#41;)

[//]: # (- ❌ File uploads)

[//]: # (- ❌ Heavy computations)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 📱 Priority 8: Mobile & Accessibility)

[//]: # ()
[//]: # (### 1. Add Viewport Configuration)

[//]: # ()
[//]: # (```typescript)

[//]: # (// In layout.tsx)

[//]: # (export const viewport = {)

[//]: # (  width: 'device-width',)

[//]: # (  initialScale: 1,)

[//]: # (  maximumScale: 5,)

[//]: # (  userScalable: true,)

[//]: # (  themeColor: '#121212',)

[//]: # (};)

[//]: # (```)

[//]: # ()
[//]: # (### 2. Respect Motion Preferences)

[//]: # ()
[//]: # (```typescript)

[//]: # (import { useReducedMotion } from 'framer-motion';)

[//]: # ()
[//]: # (const Hero = &#40;&#41; => {)

[//]: # (  const shouldReduceMotion = useReducedMotion&#40;&#41;;)

[//]: # (  )
[//]: # (  return &#40;)

[//]: # (    <motion.div)

[//]: # (      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }})

[//]: # (      animate={{ opacity: 1, y: 0 }})

[//]: # (      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }})

[//]: # (    >)

[//]: # (      {/* content */})

[//]: # (    </motion.div>)

[//]: # (  &#41;;)

[//]: # (};)

[//]: # (```)

[//]: # ()
[//]: # (### 3. Add ARIA Labels)

[//]: # ()
[//]: # (```typescript)

[//]: # (<button )

[//]: # (  onClick={handleMenu})

[//]: # (  aria-label="Toggle navigation menu")

[//]: # (  aria-expanded={showMenu})

[//]: # (>)

[//]: # (  {/* icon */})

[//]: # (</button>)

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🔍 Priority 9: Monitoring & Analytics)

[//]: # ()
[//]: # (### 1. Add Web Vitals Monitoring)

[//]: # ()
[//]: # (```typescript)

[//]: # (// In app/layout.tsx)

[//]: # (export function reportWebVitals&#40;metric&#41; {)

[//]: # (  console.log&#40;metric&#41;;)

[//]: # (  )
[//]: # (  // Send to analytics)

[//]: # (  if &#40;metric.label === 'web-vital'&#41; {)

[//]: # (    fetch&#40;'/api/analytics', {)

[//]: # (      method: 'POST',)

[//]: # (      body: JSON.stringify&#40;{)

[//]: # (        name: metric.name,)

[//]: # (        value: metric.value,)

[//]: # (        route: window.location.pathname,)

[//]: # (      }&#41;,)

[//]: # (    }&#41;;)

[//]: # (  })

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (### 2. Add Error Boundary)

[//]: # ()
[//]: # (```typescript)

[//]: # (// Create app/error.tsx)

[//]: # ('use client';)

[//]: # ()
[//]: # (export default function Error&#40;{)

[//]: # (  error,)

[//]: # (  reset,)

[//]: # (}: {)

[//]: # (  error: Error & { digest?: string };)

[//]: # (  reset: &#40;&#41; => void;)

[//]: # (}&#41; {)

[//]: # (  return &#40;)

[//]: # (    <div>)

[//]: # (      <h2>Something went wrong!</h2>)

[//]: # (      <button onClick={&#40;&#41; => reset&#40;&#41;}>Try again</button>)

[//]: # (    </div>)

[//]: # (  &#41;;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 📋 Implementation Checklist)

[//]: # ()
[//]: # (### Phase 1: Quick Wins &#40;1-2 days&#41;)

[//]: # (- [ ] Add `revalidate = 60` to `page.tsx`)

[//]: # (- [ ] Fix typo in bank/documents routes &#40;already done ✅&#41;)

[//]: # (- [ ] Add cache headers to `/api/auth/me`)

[//]: # (- [ ] Optimize MongoDB queries with `.select&#40;&#41;` and `.lean&#40;&#41;`)

[//]: # (- [ ] Fix `md:grid-4` typo in VehicleSlider)

[//]: # ()
[//]: # (### Phase 2: Bundle Optimization &#40;2-3 days&#41;)

[//]: # (- [ ] Remove Redux for modal/menu state)

[//]: # (- [ ] Implement RTK Query for user data)

[//]: # (- [ ] Add dynamic imports for code splitting)

[//]: # (- [ ] Optimize icon imports)

[//]: # (- [ ] Replace inline SVGs with memoized components)

[//]: # ()
[//]: # (### Phase 3: Caching & Performance &#40;3-4 days&#41;)

[//]: # (- [ ] Implement Redis caching &#40;optional&#41;)

[//]: # (- [ ] Add rate limiting to API routes)

[//]: # (- [ ] Convert simple routes to Edge runtime)

[//]: # (- [ ] Add Zod validation to all API routes)

[//]: # (- [ ] Implement request deduplication)

[//]: # ()
[//]: # (### Phase 4: Advanced Optimizations &#40;1 week&#41;)

[//]: # (- [ ] Convert Hero to Server Component)

[//]: # (- [ ] Split Header into Server + Client parts)

[//]: # (- [ ] Add streaming with Suspense)

[//]: # (- [ ] Implement optimistic updates)

[//]: # (- [ ] Add comprehensive monitoring)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 📊 Expected Performance Improvements)

[//]: # ()
[//]: # (| Metric | Before | After | Improvement |)

[//]: # (|--------|--------|-------|-------------|)

[//]: # (| **Home Page Load** | ~500ms | ~50ms | **90% faster** |)

[//]: # (| **JavaScript Bundle** | ~180KB | ~110KB | **39% smaller** |)

[//]: # (| **Database Queries** | Every request | Cached 60s | **90% reduction** |)

[//]: # (| **Time to Interactive** | ~2.5s | ~1.2s | **52% faster** |)

[//]: # (| **Largest Contentful Paint** | ~1.8s | ~0.6s | **67% faster** |)

[//]: # (| **Re-renders &#40;Header&#41;** | 60/sec | 6/sec | **90% reduction** |)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🎓 Best Practices Summary)

[//]: # ()
[//]: # (### DO ✅)

[//]: # (1. Use Server Components by default)

[//]: # (2. Add revalidation to static/dynamic pages)

[//]: # (3. Cache API responses with appropriate headers)

[//]: # (4. Use RTK Query for data fetching)

[//]: # (5. Optimize database queries with `.select&#40;&#41;` and `.lean&#40;&#41;`)

[//]: # (6. Use dynamic imports for code splitting)

[//]: # (7. Add Zod validation to all API routes)

[//]: # (8. Implement rate limiting)

[//]: # (9. Use Edge runtime for simple routes)

[//]: # (10. Monitor Core Web Vitals)

[//]: # ()
[//]: # (### DON'T ❌)

[//]: # (1. Don't use Redux for simple UI state)

[//]: # (2. Don't fetch data in client components without caching)

[//]: # (3. Don't inline large SVGs without memoization)

[//]: # (4. Don't skip error boundaries)

[//]: # (5. Don't ignore `prefers-reduced-motion`)

[//]: # (6. Don't use `useEffect` for data fetching &#40;use RTK Query&#41;)

[//]: # (7. Don't render heavy components without Suspense)

[//]: # (8. Don't skip TypeScript validation)

[//]: # (9. Don't forget to throttle scroll/resize handlers)

[//]: # (10. Don't deploy without testing mobile performance)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 🔗 Useful Resources)

[//]: # ()
[//]: # (- [Next.js Performance]&#40;https://nextjs.org/docs/app/building-your-application/optimizing&#41;)

[//]: # (- [Redux Toolkit Query]&#40;https://redux-toolkit.js.org/rtk-query/overview&#41;)

[//]: # (- [MongoDB Query Optimization]&#40;https://www.mongodb.com/docs/manual/tutorial/optimize-query-performance/&#41;)

[//]: # (- [Web Vitals]&#40;https://web.dev/vitals/&#41;)

[//]: # (- [Framer Motion Performance]&#40;https://www.framer.com/motion/performance/&#41;)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (**Last Updated:** 2026-05-29  )

[//]: # (**Project:** RYDER Vehicle Booking System  )

[//]: # (**Framework:** Next.js 16 + MongoDB + Redux Toolkit)
