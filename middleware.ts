import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

interface RoutePermissions {
  [key: string]: string | null;
};

const routePermissions: RoutePermissions = {
  //? Dashboard
  "/$": "A",

  //? API
  "/api/primarios": "A",
  "/api/secundarios": "A",
  "/api/usuarios": "M",

  //? Pages
  "/primarios": "A",
  "/secundarios": "A",
  "/usuarios": "M",
};

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const path = Object.keys(routePermissions).find(key => {
      const regex = new RegExp(`^${key}`);
      return regex.test(request.nextUrl.pathname);
    });
    
    if (!path) {
      return NextResponse.json({ error: "Path not found" }, { status: 404 });
    }
    const requiredPermission = routePermissions[path];
    const userPermission = request.nextauth.token?.type;

    if (!userPermission || (userPermission !== requiredPermission && !(requiredPermission === "A" && userPermission === "M"))) {
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