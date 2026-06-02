import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "@/app/redux/modalSlice";
import userSlice from "@/app/redux/userSlice";
import menuSlice from "@/app/redux/menuSlice";

export const store = configureStore({
	reducer: {
		modal:modalSlice,
			user:userSlice,
			menu:menuSlice
	}
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/*
============================================================================
  PERFORMANCE OPTIMIZATION RECOMMENDATIONS - Redux Store
============================================================================

⚠️ RECOMMENDATIONS:

1. CONSIDER RTK QUERY (High Priority):
   - Replace manual fetch + dispatch with RTK Query
   - Automatic caching, deduplication, and revalidation
   - Example:
     
     import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
     
     export const api = createApi({
       reducerPath: 'api',
       baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
       endpoints: (builder) => ({
         getUser: builder.query({
           query: () => '/auth/me',
           providesTags: ['User'],
         }),
       }),
     });
     
     // In component:
     const { data: user, isLoading } = useGetUserQuery();

2. REDUX SLICES TO KEEP:
   - userSlice: ✅ (cross-component user data)
   
3. REDUX SLICES TO REMOVE:
   - modalSlice: ❌ (use React useState)
   - menuSlice: ❌ (use React useState)
   
4. ADD REDUX DEVTOOLS CONFIGURATION:
   - Already enabled in development (good)
   - Consider: Disable in production for performance
   
5. PERSIST REDUX STATE (Optional):
   - Use redux-persist to survive page refreshes
   - Useful for: user preferences, theme, language
   - Not needed for: modal state, loading states

6. MEMOIZE SELECTORS:
   - Use createSelector from reselect
   - Prevents unnecessary re-renders
   - Example:
     import { createSelector } from '@reduxjs/toolkit';
     export const selectUserRole = createSelector(
       [selectUser],
       (user) => user?.role
     );

============================================================================
*/