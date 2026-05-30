import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes do NOT require a login
const isPublicRoute = createRouteMatcher([
  "/",
  "/shop(.*)",
  "/story",
  "/contact",
  "/wholesale",
  "/terms",
  "/privacy",
  "/refund",
  "/cart",
  "/api/webhook(.*)", // for future payment webhooks
  "/studio(.*)", // We let Sanity handle its own authentication
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // Require login for anything not listed above
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // CRITICAL FIX: Clerk's background sync route MUST be allowed through!
    '/__clerk/(.*)',
  ],
};