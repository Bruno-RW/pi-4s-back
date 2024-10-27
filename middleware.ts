import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

interface RoutePermissions {
  [key: string]: string | null;
};

const routePermissions: RoutePermissions = {
  "/api": null,
  "/api/users": "M",
  "/api/clients": "M",
  "/users": "M",
  "/clients": "M"
};

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const path = Object.keys(routePermissions).find(key => request.nextUrl.pathname.startsWith(key));

    if ( path && (!request.nextauth.token?.type || request.nextauth.token.type !== routePermissions[path]) ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const origin = request.nextUrl.origin;
    const pathname = request.nextUrl.pathname;
    const requestHeaders = new Headers(request.headers);
    
    requestHeaders.set("x-url", request.url);
    requestHeaders.set("x-origin", origin);
    requestHeaders.set("x-pathname", pathname);

    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/((?!api/).*)"],
};